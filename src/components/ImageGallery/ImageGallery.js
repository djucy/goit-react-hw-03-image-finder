// import React, { Children } from "react";

import PropTypes from 'prop-types';
import { Component } from 'react';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  onOpenImage = (id, largeImageURL, tags) => {
    this.props.onClick(id, largeImageURL, tags);
  };

  render() {
    const { images } = this.props;
    return (
      <ul className={s.ImageGallery}>
        {images.map(({ id, webformatURL, largeImageURL, tags }) => (
          <ImageGalleryItem
            key={id}
            webformatURL={webformatURL}
            id={id}
            tags={tags}
            onClick={this.onOpenImage}
            largeImageURL={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  // onOpenImage:PropTypes.func.isRequired,
};
