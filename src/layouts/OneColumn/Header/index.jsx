import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { graphql, useStaticQuery } from 'gatsby';
import { getMediaIcon, strip } from '../../../utils/media';
import { useResume } from '../../../components/Base';
import {
  container,
  header,
  list,
  item,
  list_item,
  icon,
} from './Header.module.scss';
import { text__primary, text__alt } from '../shared.module.scss';

const query = graphql`
  {
    site {
      siteMetadata {
        author
      }
    }
  }
`;

export default function Header() {
  const { site } = useStaticQuery(query);
  const { socials, title } = useResume();

  return (
    <header className={container}>
      <div className={header}>
        <h1 className={text__primary}>{site.siteMetadata.author}</h1>
        <strong>{title}</strong>
      </div>
      <ul className={list}>
        {socials.map((social) => {
          const Icon = getMediaIcon(social.type);
          return (
            <li className={item} key={social.id}>
              <OutboundLink
                rel='noopener noreferrer'
                className={list_item}
                href={social.url}
                target='_blank'
              >
                <Icon className={icon} />
                <span>{strip(social.url, social.type)}</span>
              </OutboundLink>
            </li>
          );
        })}
      </ul>
    </header>
  );
}
