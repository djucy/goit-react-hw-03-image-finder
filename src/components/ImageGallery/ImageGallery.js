import React from 'react';
import PropTypes from 'prop-types';
import { Component } from 'react';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Text from '../Text/Text';
import Section from '../Section/Section.js';
import Spinner from '../Spinner/Spinner';

import s from './ImageGallery.module.css';

export default class ImageGallery extends Component {
  onOpenImage = (id, largeImageURL, tags) => {
    this.props.onClick(id, largeImageURL, tags);
  };

  render() {
    const { images, status, error } = this.props;

    if (status === 'idle') {
      return <Text text={'Please, enter pictures name...'} />;
    }

    if (status === 'pending') {
      return (
        <Section>
          <Spinner
            text={'Please,wait. We are searching the pictures for you'}
          ></Spinner>
        </Section>
      );
    }

    if (status === 'rejected') {
      return (
        <Section>
          {error && <Text text={'We have a problem...pelase,try again...'} />}
        </Section>
      );
    }

    if (status === 'resolved' && images.length === 0) {
      return <Text text={`Photo not found, please try another name`} />;
    }

    if (status === 'resolved' && images.length !== 0) {
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
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  // onOpenImage:PropTypes.func.isRequired,
};
