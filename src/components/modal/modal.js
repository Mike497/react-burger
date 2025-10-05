import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import ModalOverlay from './modal-overlay';

import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './modals.module.css';

const modalRoot = document.getElementById('react-modals');

const Modal = ({ children, title, onClose }) => {
  React.useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

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

Modal.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

export default Modal;