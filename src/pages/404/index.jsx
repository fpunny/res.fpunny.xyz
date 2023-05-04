import { Link } from 'gatsby';
import Base, { Head as BaseHead } from '../../components/Base';
import useMetadata from '../../utils/useMetadata';
import {
  container,
  content,
  heading,
  text,
  link,
  button,
} from './404.module.scss';

export default function NotFound(props) {
  const metadata = useMetadata();
  return (
    <Base {...props}>
      <div className={container}>
        <div className={content}>
          <h1 className={heading}>Looks like this resume doesn't exist...</h1>
          <p className={text}>
            Interested in my work?{' '}
            <a
              className={link}
              href={`mailto:${metadata.contact}`}
              target='_blank'
            >
              Let's get in touch
            </a>
          </p>
          <Link to='/' className={button}>
            Back to Home
          </Link>
        </div>
      </div>
    </Base>
  );
}

export function Head(props) {
  return (
    <>
      <style>{`
        html, body, #___gatsby, #gatsby-focus-wrapper {
          height: 100%;
        }
      `}</style>
      <BaseHead {...props} />
    </>
  );
}
