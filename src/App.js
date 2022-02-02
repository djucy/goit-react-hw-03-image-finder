import React from 'react';
import { PureComponent } from 'react';
import { Flip, ToastContainer } from 'react-toastify';
import { animateScroll as scroll } from 'react-scroll';
import '../node_modules/react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Spinner from '../src/components/Spinner/Spinner';

import Searchbar from './components/Searchbar/Searchbar';
import Button from './components/Button/Button';
import searchNameApi from './services/searchName-api';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Modal from './components/Modal/Modal';
import ModalImage from './components/ModalImage/ModalImage';
import Section from './components/Section/Section';
import Text from './components/Text';
import './App.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends PureComponent {
  state = {
    searchName: '',
    page: 1,
    images: [],
    status: 'idle',
    showModal: false,
    id: '',
    largeImageURL: '',
    tags: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.searchName;

    const { page, searchName } = this.state;

    if (prevName !== searchName) {
      this.setState({ status: Status.PENDING });
      searchNameApi
        .fetchSearchName(searchName, page)
        .then(newImages =>
          this.setState({
            images: [...newImages],
            status: Status.RESOLVED,
            page: 1,
          }),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  handleSearchFormSubmit = searchName => {
    this.setState({ searchName });
  };

  onLoadImages = () => {
    this.setState({ status: Status.PENDING });
    const { page, searchName } = this.state;

    searchNameApi
      .fetchSearchName({ searchName, page })
      .then(newImages => {
        this.setState(prevState => {
          return {
            images: [...prevState.images, ...newImages],
            page: prevState.page + 1,
            status: Status.RESOLVED,
          };
        });
      })

      .catch(error => this.setState({ error, status: Status.REJECTED }));
    this.scrollToBottom();
  };

  scrollToBottom() {
    scroll.scrollToBottom();
  }

  toggleModal = () => {
    // return <Modal></Modal>
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

    if (status === 'idle') {
      return (
        <Section>
          <Searchbar onSubmit={this.handleSearchFormSubmit}></Searchbar>
          <Text text={'Please, enter pictures name...'}></Text>
          <ToastContainer transition={Flip} />
        </Section>
      );
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
        <div>
          <p>O-o...we have a problem...</p>
        </div>
      );
    }
    if (status === 'resolved') {
      return (
        <Section>
          <Searchbar onSubmit={this.handleSearchFormSubmit}></Searchbar>
          <ImageGallery images={images} onClick={this.onOpenImage} />
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
          <ToastContainer transition={Flip} />
        </Section>
      );
    }
  }
}