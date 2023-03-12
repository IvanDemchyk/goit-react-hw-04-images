import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal } from 'components/Modal/Modal';

import { GalleryItem, GalleryImg } from './ImageGalleryItem.styled';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  onModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };
  render() {
    const { item } = this.props;
    const { webformatURL } = item;
    return (
      <GalleryItem>
        <GalleryImg onClick={this.onModal} src={webformatURL} alt="img" />
        {this.state.showModal && <Modal onClose={this.onModal} image={item} />}
      </GalleryItem>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
