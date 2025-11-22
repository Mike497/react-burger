import React from 'react';
import ReactDOM from 'react-dom';
import ModalOverlay from './modal-overlay';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modals.module.css';

const modalRoot = document.getElementById('react-modals');

type TModalProps = {
  children: React.ReactNode;
  title?: string;
  onClose: () => void;
};

const Modal: React.FC<TModalProps> = ({ children, title, onClose }) => {
  React.useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.modal}>
        <div className={styles.header}>
          {title && <p className="text text_type_main-large">{title}</p>}
          <Button htmlType="button" type="secondary" size="small" extraClass={`${styles.closeButton} mt-2`} onClick={onClose}>
            <CloseIcon type="primary" />
          </Button>
        </div>
        {children}
      </div>
    </>,
    modalRoot
  );
};

export default Modal;