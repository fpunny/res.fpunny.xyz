import classNames from 'classnames';
import { container } from './Page.module.scss';

export default function Page({ children, className }) {
  return (
    <div
      className={classNames(
        className,
        container,
      )}
    >
      {children}
    </div>
  );
}