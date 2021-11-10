import { RiMoonLine } from '@react-icons/all-files/ri/RiMoonLine';
import { RiSunLine } from '@react-icons/all-files/ri/RiSunLine';
import { useEffect, useState, useRef } from 'react';
import gtag from '../../../utils/gtag';
import Control from "../../Control";

export default function ChangeTheme() {
  const [ isDark, setIsDark ] = useState(window?.__isDark ?? false);
  const isDirty = useRef(false);

  // Handle theming
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaHandler = ({ matches }) => {
      if (!isDirty.current) setIsDark(matches);
    };

    mediaHandler(media);
    gtag('event', 'theme', {
      type: media.matches ? 'dark' : 'light',
    });
    media.addEventListener('change', mediaHandler);

    const beforePrintHandler = () => media.removeEventListener('change', mediaHandler);
    window.addEventListener('beforeprint', beforePrintHandler);

    const afterPrintHandler = () => media.addEventListener('change', mediaHandler);
    window.addEventListener('afterprint', afterPrintHandler);

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.documentElement.classList.add('animate');
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
    const handler = () => gtag('event', 'print', {
      theme: isDark ? 'dark' : 'light',
      count: ++printCount.current,
    });

    window.addEventListener('beforeprint', handler);
    return () => {
      window.removeEventListener('beforeprint', handler);
    };

  }, [ isDark ]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
    if (isDirty.current) {
      gtag('event', 'action', {
        theme: isDark ? 'dark' : 'light',
        type: 'theme',
      });
    }
  }, [ isDark ]);

  return (
    <Control
      icon={isDark ? RiMoonLine : RiSunLine}
      onClick={() => {
        isDirty.current = true;
        setIsDark(!isDark);
      }}
    />
  );
}