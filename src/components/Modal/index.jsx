import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames/bind';
import * as styles from './Modal.module.scss';
import * as speeds from './exports.module.scss';

export default function Modal({ show, onClose, className, speed = 'normal', ...props }) {
  const el = useRef(document.getElementById('modal'));
  const [ _show, setShow ] = useState(show);

  useEffect(() => {
    let mounted = true;
    window.setTimeout(() => {
      window.requestAnimationFrame(() => {
        if (mounted) setShow(show);
      });
    }, show ? 10 : speeds[speed]);

    return () => {
      mounted = false;
    }
  }, [ show, speed ]);

  const isMounted = show || _show;
  const isShown = show && _show;

  if (!isMounted) return null;

  return createPortal(
    <div
      onClick={onClose}
      className={classNames(
        isShown || styles['modal__hidden'],
        styles[`modal__speed__${speed}`],
        styles['modal'],
      )}
    >
      <div
        {...props}
        onClick={e => e.stopPropagation()}
        className={classNames(
          styles['box'],
          className,
        )}
      />
    </div>,
    el.current,
  );
}