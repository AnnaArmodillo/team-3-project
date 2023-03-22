/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import classNames from 'classnames';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineClose } from 'react-icons/ai';
import modalStyles from './modal.module.scss';

function ModalContent({ children, closeHandler }) {
  useEffect(() => {
    const listenerHandler = (e) => {
      if (e.key === 'Escape') {
        closeHandler();
      }
    };

    document.addEventListener('keydown', listenerHandler);

    return () => {
      document.removeEventListener('keydown', listenerHandler);
    };
  }, [closeHandler]);

  return (
    <div
      className={modalStyles.modalContent}
    >
      <button
        type="button"
        onClick={closeHandler}
        className={classNames('btn btn-light', modalStyles.closeIcon)}
      >
        <AiOutlineClose size={16} />
      </button>
      {children}
    </div>
  );
}

export function Modal({ closeHandler, isOpen = false, children }) {
  const clickHandler = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler();
    }
  };

  const renderModalContent = () => {
    if (!isOpen) return null;
    return (
      <div
        onClick={clickHandler}
        className={modalStyles.modalWr}
      >
        <ModalContent closeHandler={closeHandler}>{children}</ModalContent>
      </div>
    );
  };

  return createPortal(
    renderModalContent(),
    document.getElementById('modal-root'),
  );
}
