import { control, icon } from './Control.module.scss';

export default function Control({ icon: Icon, link, ...props }) {
  if (link) {
    return (
      <a
        {...props}
        rel='noopener noreferrer'
        className={control}
        target='_blank'
        href={link}
      >
        <Icon className={icon} />
      </a>
    );
  }


  return (
    <button
      {...props}
      className={control}
    >
      <Icon className={icon} />
    </button>
  );
}