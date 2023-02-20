import { FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';
import s from './Modal.module.css';
import FocusTrap from './FocusTrap';

type Props = {
  className?: string;
  children?: ReactNode;
  onClose: () => void;
};

const Modal: FC<Props> = ({ className, onClose, children }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    const modal = ref.current;

    window.addEventListener('keydown', handleKey);
    disableBodyScroll(modal, { reserveScrollBarGap: true });

    return () => {
      clearAllBodyScrollLocks();
      window.addEventListener('keydown', handleKey);
    };
  }, [handleKey]);

  return (
    <div className={s.root}>
      <div className={s.modal}>
        <button onClick={() => onClose()}>close button</button>
        <FocusTrap>{children}</FocusTrap>
      </div>
    </div>
  );
};

export default Modal;
