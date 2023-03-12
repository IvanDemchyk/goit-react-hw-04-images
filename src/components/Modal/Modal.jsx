import PropTypes from 'prop-types';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './Modal.styled';

const ModalBox = document.querySelector('#ModalBox');

export const Modal = ({ onClose, image }) => {
  useEffect(() => {
    window.addEventListener('keydown', keyDown);
    return () => {
      window.removeEventListener('keydown', keyDown);
    };
  });

  const keyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const onBoxClose = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return createPortal(
    <Overlay onClick={onBoxClose}>
      <ModalContainer>
        <img src={image} alt="img" />
      </ModalContainer>
    </Overlay>,
    ModalBox
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
