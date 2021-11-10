import { OutboundLink } from 'gatsby-plugin-google-gtag';
import { control, icon } from './Control.module.scss';

export default function Control({ icon: Icon, link, action, ...props }) {
  if (link) {
    return (
      <OutboundLink
        {...props}
        rel='noopener noreferrer'
        className={control}
        target='_blank'
        href={link}
      >
        <Icon className={icon} />
      </OutboundLink>
    );
  }

  return (
    <button {...props} className={control}>
      <Icon className={icon} />
    </button>
  );
}
