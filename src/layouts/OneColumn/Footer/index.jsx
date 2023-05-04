import { useResume } from '../../../components/Base';
import useMetadata from '../../../utils/useMetadata';
import BaseSection from '../BaseSection';
import { container, link } from './Footer.module.scss';

export default function Footer() {
  const { homepage } = useMetadata();
  const { subdomain } = useResume();
  const url = `${homepage}${'/' + subdomain}`;

  return (
    <BaseSection className={container}>
      <p>Want to keep up to date with this resume?</p>
      <p>
        Check it out @{' '}
        <a
          rel='noreferrer noopener'
          className={link}
          target='_blank'
          href={url}
        >
          {url}
        </a>
      </p>
    </BaseSection>
  );
}
