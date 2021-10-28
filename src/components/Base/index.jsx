import { graphql, useStaticQuery } from 'gatsby';
import { createContext, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { controls, control } from './Base.module.scss';

const ResumeContext = createContext({});

const query = graphql`
  {
    data: allGraphCmsMetadata(filter: { global: { eq: true } }) {
      nodes {
        field
        listValue
        jsonValue
        stringValue
        numberValue
        booleanValue
        datetimeValue
      }
    }
  }
`;

const themeHandler = ({ matches }) => {
  document.documentElement.classList.toggle('dark', matches);
};

export const useResume = () => {
  return useContext(ResumeContext);
};

export default function Base({ pageContext, children }) {
  const { theme, metadatas } = pageContext.resumeInfo;
  const { data } = useStaticQuery(query);

  const metadata = data.nodes.concat(metadatas).reduce((acc, curr) => {
    acc[curr.field] =
      curr.stringValue ??
      curr.numberValue ??
      curr.booleanValue ??
      curr.datetimeValue ??
      curr.jsonValue ??
      curr.listValue;
    return acc;
  }, {});

  const rgb = [theme.rgba.r, theme.rgba.g, theme.rgba.b];
  const searchParams = new URLSearchParams({
    color: theme.hex,
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', themeHandler);
    themeHandler(media);

    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        document.documentElement.classList.add('animate');
      });
    }, 10);
  }, []);

  return (
    <ResumeContext.Provider value={pageContext.resumeInfo}>
      <Helmet titleTemplate='Frederic Pun | %s' title={metadata.title}>
        <link rel="shortcut icon" type="image/svg" href={`/api/assets/logo?${searchParams}`}/>
        <style type='text/css'>{`:root{--primary:${rgb.join(', ')};}`}</style>
        <meta name='keywords' content={metadata.keywords.join(`,`)} />
        <meta name='description' content={metadata.description} />
        <meta property='og:url' content={process.env.GATSBY_URL} />
        <meta name='og:title' content={metadata.title} />
        <meta name='og:description' content={metadata.description} />
        <meta name='twitter:title' content={metadata.title} />
        <meta name='twitter:description' content={metadata.description} />
      </Helmet>
      {children}
      <nav className={controls}>
        <button className={control}>owo</button>
      </nav>
    </ResumeContext.Provider>
  );
}
