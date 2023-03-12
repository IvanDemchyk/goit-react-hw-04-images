import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';

import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <GalleryItem>
      <GalleryImg onClick={openModal} src={item.webformatURL} alt="img" />
      {isOpen && <Modal onClose={closeModal} image={item.largeImageURL} />}
    </GalleryItem>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
