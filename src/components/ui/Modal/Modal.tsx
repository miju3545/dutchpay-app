import { FC, MutableRefObject, ReactNode, useCallback, useEffect, useRef } from 'react';
import { clearAllBodyScrollLocks, disableBodyScroll } from 'body-scroll-lock';

import FocusTrap from './FocusTrap';

type Props = {
  className?: string;
  children?: ReactNode;
  onClose: () => void;
  isCloseExisting?: boolean;
};

const Modal: FC<Props> = ({ className, onClose, children, isCloseExisting = false }) => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  }, []);

  useEffect(() => {
    const modal = ref.current;

    if (modal) {
      window.addEventListener('keydown', handleKey);
      disableBodyScroll(modal, { reserveScrollBarGap: true });

      return () => {
        clearAllBodyScrollLocks();
        window.addEventListener('keydown', handleKey);
      };
    }
  }, [handleKey]);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, right: 0 }}>
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
        {isCloseExisting && <button onClick={() => onClose()}>close button</button>}
        <FocusTrap>{children}</FocusTrap>
      </div>
    </div>
  );
};

export default Modal;
