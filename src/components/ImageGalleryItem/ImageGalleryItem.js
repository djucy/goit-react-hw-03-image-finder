import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './ImageGalleryItem.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    id: this.props.id,
    webformatURL: this.props.webformatURL,
    tags: this.props.tags,
    largeImageURL: this.props.largeImageURL,
  };
  onOpenImage = () => {
    this.props.onClick(
      this.state.id,
      this.state.largeImageURL,
      this.state.tags,
    );
  };
  render() {
    const { id, webformatURL, tags } = this.props;
    return (
      <li key={id} className={s.ImageGalleryItem}>
        <img
          className={s.ImageGalleryItem__image}
          src={webformatURL}
          alt=""
          id={id}
          alt={tags}
          loading="lazy"
          onClick={this.onOpenImage}
        />
      </li>
    );
  }
}

ImageGalleryItem.propTypes = {
  id: PropTypes.number.isRequired,
  webformatURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onOpenImage: PropTypes.func,
};
