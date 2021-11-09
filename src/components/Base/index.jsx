import { createContext, useContext, useEffect, useState } from 'react';
import { RiPrinterLine } from '@react-icons/all-files/ri/RiPrinterLine';
import { RiGithubLine } from '@react-icons/all-files/ri/RiGithubLine';
import { Helmet } from 'react-helmet';
import classNames from 'classnames';
import useMetadata from '../../utils/useMetadata';
import { controls, controls__hidden, control, icon } from './Base.module.scss';

export default function Base({ pageContext, children }) {
  const { theme, metadatas } = pageContext.resumeInfo;
  const [ isDark, setIsDark ] = useState(false);
  const metadata = useMetadata(metadatas);

  const actions = [
    {
      icon: RiGithubLine,
      link: 'https://github.com/fpunny',
    },
    {
      icon: RiPrinterLine,
      onClick: () => window.print(),
    },
  ];

  // Handle theming
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const mediaHandler = ({ matches }) => setIsDark(matches);

    media.addEventListener('change', mediaHandler);
    mediaHandler(media);

    const beforePrintHandler = () => {
      media.removeEventListener('change', mediaHandler);
    };
    window.addEventListener('beforeprint', beforePrintHandler);

    const afterPrintHandler = () => {
      media.addEventListener('change', mediaHandler);
    };
    window.addEventListener('afterprint', afterPrintHandler);

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.documentElement.classList.add('animate');
      });
    }, 10);

    return () => {
      window.removeEventListener('beforeprint', beforePrintHandler);
      window.removeEventListener('afterprint', afterPrintHandler);
      media.removeEventListener('change', mediaHandler);
    };
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [ isDark ]);

  // Handle button stuff
  const [ hideButtons, setHideButtons ] = useState(false);
  useEffect(() => {
    let lastCheckpoint = window.pageYOffset;
    let lastPos = window.pageYOffset;
    const handler = () => {
      const currPos = window.pageYOffset;
      if ((hideButtons && currPos <= lastPos) || (!hideButtons && currPos >= lastPos)) {
        if (Math.abs(lastCheckpoint - lastPos) >= 50) {
          setHideButtons(!hideButtons);
        }
      } else {
        lastCheckpoint = currPos;
      }
      lastPos = currPos;
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => {
      window.removeEventListener('scroll', handler, { passive: true });
    };
  }, [ hideButtons ]);

  return (
    <ResumeContext.Provider value={pageContext.resumeInfo}>
      <Helmet titleTemplate='Frederic Pun | %s' title={metadata.title}>
        <link
          href={`/api/assets/logo?${new URLSearchParams({ color: theme.hex })}`}
          rel="shortcut icon"
          type="image/svg"
        />
        <style type='text/css'>
          {`:root{--primary:${Object.values(theme.rgba).join(', ')};}`}
        </style>
        <meta name='keywords' content={metadata.keywords.join(`,`)} />
        <meta name='description' content={metadata.description} />
        <meta property='og:url' content={process.env.GATSBY_URL} />
        <meta name='og:title' content={metadata.title} />
        <meta name='og:description' content={metadata.description} />
        <meta name='twitter:title' content={metadata.title} />
        <meta name='twitter:description' content={metadata.description} />
      </Helmet>
      {children}
      <nav className={classNames(controls, hideButtons && controls__hidden)}>
        {actions.map(({ icon: Icon, link, ...props }, i) => (
          link ? (
            <a
              {...props}
              rel='noopener noreferrer'
              className={control}
              target='_blank'
              href={link}
              key={i}
            >
              <Icon className={icon} />
            </a>
          ) : (
            <button
              {...props}
              className={control}
              key={i}
            >
              <Icon className={icon} />
            </button>
          )
        ))}
      </nav>
    </ResumeContext.Provider>
  );
}

const ResumeContext = createContext({});
export const useResume = () => {
  return useContext(ResumeContext);
};
