import {
  useState,
  useRef,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import useAnalytics from './useAnalytics';
import { Helmet } from 'react-helmet';
import Color from 'color';

const ThemeContext = createContext({
  setIsDark: () => {},
  isDark: false,
  setTheme: () => {},
  theme: { r: 0, g: 0, b: 0 },
  ready: false,
});

export function sanitizeColor(color) {
  color = parseInt(color) || 0;
  if (color > 255) color = 255;
  else if (color < 0) color = 0;
  return color;
}

export function ThemeProvider({ initColor, children }) {
  const [theme, setTheme] = useState(initColor ?? { r: 0, g: 0, b: 0 });
  const [isDark, setIsDark] = useState(false);
  const [ready, setReady] = useState(false);
  const isDirty = useRef(false);
  const gtag = useAnalytics();

  // Handle theming
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaHandler = ({ matches }) => {
      if (!isDirty.current) setIsDark(matches);
    };

    mediaHandler(media);
    gtag('event', 'set-theme', {
      event_category: 'init',
      event_label: media.matches ? 'dark' : 'light',
    });
    media.addEventListener('change', mediaHandler);

    const beforePrintHandler = () =>
      media.removeEventListener('change', mediaHandler);
    window.addEventListener('beforeprint', beforePrintHandler);

    const afterPrintHandler = () =>
      media.addEventListener('change', mediaHandler);
    window.addEventListener('afterprint', afterPrintHandler);

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.documentElement.classList.add('animate');
        setReady(true);
      });
    }, 50);

    return () => {
      window.removeEventListener('beforeprint', beforePrintHandler);
      window.removeEventListener('afterprint', afterPrintHandler);
      media.removeEventListener('change', mediaHandler);
    };
  }, []);

  // Google analytics tracking
  const printCount = useRef(0);
  useEffect(() => {
    const handler = () =>
      gtag('event', 'print', {
        event_category: 'actions',
        event_label: isDark ? 'dark' : 'light',
        value: ++printCount.current,
      });

    window.addEventListener('beforeprint', handler);
    return () => {
      window.removeEventListener('beforeprint', handler);
    };
  }, [isDark]);

  const themeCount = useRef(0);
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    if (!initColor) {
      const c = isDark ? 255 : 0;
      setTheme({ r: c, g: c, b: c });
    }

    if (isDirty.current) {
      gtag('event', 'change-theme', {
        event_category: 'actions',
        event_label: isDark ? 'dark' : 'light',
        value: ++themeCount.current,
      });
    }
  }, [isDark, initColor]);

  const hex = Color(theme).hex();

  return (
    <ThemeContext.Provider
      value={{
        setIsDark: useCallback((value) => {
          isDirty.current = true;
          setIsDark((_isDark) => value ?? !_isDark);
        }, []),
        isDark,
        setTheme,
        theme,
        ready,
      }}
    >
      <Helmet>
        <meta name='theme-color' content={hex} />
        <link
          href={`/api/assets/logo?${new URLSearchParams({ color: hex })}`}
          rel='shortcut icon'
          type='image/svg'
        />
        <style type='text/css'>
          {`:root{--primary:${Object.values(theme).join(', ')};}`}
        </style>
      </Helmet>
      {children}
    </ThemeContext.Provider>
  );
}

export default function useTheme() {
  return useContext(ThemeContext);
}
