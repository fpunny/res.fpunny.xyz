import { createContext, useContext, useEffect, useState } from 'react';
import { RiPrinterLine } from '@react-icons/all-files/ri/RiPrinterLine';
import { RiGithubLine } from '@react-icons/all-files/ri/RiGithubLine';
import { Toaster } from 'react-hot-toast';
import classNames from 'classnames';
import Color from 'color';
import { ThemeProvider } from '../../utils/useTheme';
import useMetadata from '../../utils/useMetadata';
import ChangePrimary from './ChangePrimary';
import ChangeTheme from './ChangeTheme';
import Control from '../Control';
import { controls, controls__hidden, toast } from './Base.module.scss';

export default function Base({ pageContext, withButtons, children }) {
  const { metadatas } = pageContext.resumeInfo ?? {};
  const metadata = useMetadata(metadatas);
  const theme = pageContext.resumeInfo?.theme?.hex ?? metadata.theme;

  // Handle button stuff
  const [hideButtons, setHideButtons] = useState(false);
  useEffect(() => {
    if (!withButtons) return;
    let lastCheckpoint = window.pageYOffset;
    let lastPos = window.pageYOffset;
    const handler = () => {
      const currPos = window.pageYOffset;
      if (
        (hideButtons && currPos <= lastPos) ||
        (!hideButtons && currPos >= lastPos)
      ) {
        if (Math.abs(lastCheckpoint - lastPos) >= 10) {
          setHideButtons(!hideButtons);
          lastCheckpoint = currPos;
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
  }, [hideButtons, withButtons]);

  return (
    <ResumeContext.Provider value={pageContext.resumeInfo}>
      <ThemeProvider initColor={Color(theme).object()}>
        {children}
        {withButtons && (
          <nav
            className={classNames(controls, hideButtons && controls__hidden)}
          >
            <Control
              icon={RiGithubLine}
              link='https://github.com/fpunny'
              aria-label='Go to github repo'
            />
            <ChangePrimary />
            <ChangeTheme />
            <Control
              title='Print resume'
              onClick={() => window.print()}
              icon={RiPrinterLine}
              action='print'
            />
          </nav>
        )}
        <Toaster toastOptions={{ className: toast }} position='bottom-center' />
      </ThemeProvider>
    </ResumeContext.Provider>
  );
}

const ResumeContext = createContext({});
export const useResume = () => {
  return useContext(ResumeContext);
};

export function Head(props) {
  const { metadatas } = props.pageContext.resumeInfo ?? {};
  const metadata = useMetadata(metadatas);

  return (
    <>
      <html lang='en' />
      <title>{`Frederic Pun | ${metadata.title}`}</title>
      <meta name='keywords' content={metadata.keywords.join(`,`)} />
      <meta name='description' content={metadata.description} />
      <meta property='og:url' content={process.env.GATSBY_URL} />
      <meta name='og:title' content={metadata.title} />
      <meta name='og:description' content={metadata.description} />
      <meta name='twitter:title' content={metadata.title} />
      <meta name='twitter:description' content={metadata.description} />
    </>
  );
}
