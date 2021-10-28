import classNames from 'classnames';
import { container, heading } from './BaseSection.module.scss';

export default function BaseSection({ title, children, className, ...props }) {
  return (
    <section
      className={classNames(container, className)}
      {...props}
    >
      <h2 className={heading}>{ title }</h2>
      {children}
    </section>
  );
}