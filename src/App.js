import React, { Component } from 'react';
// import { PureComponent } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Searchbar from './components/Searchbar/Searchbar';
import Modal from './components/Modal/Modal';
import ModalImage from './components/ModalImage/ModalImage';

import searchNameApi from './services/searchName-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';

import Section from './components/Section/Section';
import Text from './components/Text/Text';
import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchName: '',
    page: 1,
    images: [],
    status: 'idle',
    showModal: false,
    id: '',
    largeImageURL: '',
    tags: '',
    error: null,
  };

  //Загрузка новых фотографий

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchName;

    const { page, searchName, status } = this.state;

    if (prevName !== searchName) {
      this.setState({ status: Status.PENDING, images: [] });
      this.onLoadImages();
      scroll.scrollToTop();
      this.setState({ page: 1 });
    }
  }

  //Дозагрузка фото
  onLoadImages = () => {
    this.setState({ status: Status.PENDING });

    const { page, searchName } = this.state;

    searchNameApi
      .fetchSearchName(searchName, page)
      .then(newArrayImages => {
        this.setState(state => {
          return {
            images: [...state.images, ...newArrayImages],
            page: state.page + 1,
            status: Status.RESOLVED,
          };
        });
      })

      .catch(error => {
        this.setState({ error, status: Status.REJECTED });
      });
    this.scrollToBottom();
  };
  onOpenImage = (id, largeImageURL, tags) => {
    this.props.onClick(id, largeImageURL, tags);
  };

  // Поиск картинки по названию
  handleSearchFormSubmit = searchName => {
    this.setState({ searchName });
  };

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  toggleModal = () => {
    this.setState(state => ({
      showModal: !state.showModal,
    }));
  };

  onOpenImage = (id, largeImageURL, tags) => {
    this.setState({ id, largeImageURL, tags });

    this.toggleModal();
  };

  onCloseModal = e => {
    if (e.currentTurget === e.turget) {
      this.props.toggleModal();
    }
  };

  render() {
    const { images, status, showModal, largeImageURL, id, tags } = this.state;

    return (
      <Section>
        <Searchbar onSubmit={this.handleSearchFormSubmit}></Searchbar>
        <ToastContainer transition={Flip} />

        <ImageGallery
          images={images}
          onClick={this.onOpenImage}
          status={status}
        />
        {images.length >= 12 && images.length !== 0 && (
          <Button onLoadImages={this.onLoadImages} />
        )}
        {showModal && (
          <Modal onClose={this.toggleModal}>
            {
              <ModalImage
                url={largeImageURL}
                id={id}
                alt={tags}
                onClick={this.onCloseModal}
              ></ModalImage>
            }
          </Modal>
        )}
      </Section>
    );
  }
}
