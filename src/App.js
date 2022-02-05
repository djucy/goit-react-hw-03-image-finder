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
      //   searchNameApi
      //     .fetchSearchName(searchName, page)
      //     .then(newImages =>
      //       this.setState({
      //         images: [...newImages],
      //         status: Status.RESOLVED,
      //         page: 1,
      //       }),
      //     )
      //     .catch(error => this.setState({ error, status: Status.REJECTED }));

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
    const {
      images,
      status,
      showModal,
      largeImageURL,
      id,
      tags,
      searchName,
      error,
    } = this.state;

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

// componentDidUpdate(prevProps, prevState) {
//     const prevName = prevState.searchName;

//     const { page, searchName, images} = this.state;

//     if (prevName !== searchName) {
//       this.setState({ status: Status.PENDING });
//       searchNameApi
//         .fetchSearchName(searchName, page)
//         .then(newImages =>
//           this.setState({
//             images: [...newImages],
//             status: Status.RESOLVED,
//             page: 1,
//           }),
//         )
//         .catch(error => this.setState({ error, status: Status.REJECTED }));
//     }

//   }

//   handleSearchFormSubmit = searchName => {
//     this.setState({ searchName });
//   };

//   onLoadImages = () => {
//     this.setState({ status: Status.PENDING });
//     const { page, searchName } = this.state;

//     searchNameApi
//       .fetchSearchName({ searchName, page })
//       .then(newArrayImages => {
//         this.setState(prevState => {
//           return {
//             images: [...prevState.images, ...newArrayImages],
//             page: prevState.page + 1,
//             status: Status.RESOLVED,
//           };
//         });
//       })

//       .catch(error => {
//         this.setState({ error, status: Status.REJECTED });
//       });
//     this.scrollToBottom();
//   };

//   scrollToBottom() {
//     scroll.scrollToBottom();
//   }

//   toggleModal = () => {
//     this.setState(state => ({
//       showModal: !state.showModal,
//     }));
//   };

//   onOpenImage = (id, largeImageURL, tags) => {
//     this.setState({ id, largeImageURL, tags });

//     this.toggleModal();
//   };

//   onCloseModal = e => {
//     if (e.currentTurget === e.turget) {
//       this.props.toggleModal();
//     }
//   };

//   render() {
//     const {
//       images,
//       status,
//       showModal,
//       largeImageURL,
//       id,
//       tags,
//       searchName,
//       error,

//     } = this.state;

//     if (status === 'idle') {
//       return (
//         <Section>
//           <Searchbar onSubmit={this.handleSearchFormSubmit}></Searchbar>
//           <Text text={'Please, enter pictures name...'} />
//           <ToastContainer transition={Flip} />
//         </Section>
//       );
//     }
//     if (status === 'pending') {
//       return (
//         <Section>
//           <Spinner
//             text={'Please,wait. We are searching the pictures for you'}
//           ></Spinner>
//         </Section>
//       );
//     }
//     if (status === 'rejected') {
//       return (
//         <Section>
//           {error &&(<Text text={'We have a problem...pelase,try again...'}/>)}
//         </Section>
//       );
//     }
//     if (status === 'resolved') {
//       return (
//         <Section>
//           <Searchbar onSubmit={this.handleSearchFormSubmit}></Searchbar>
//           <ImageGallery images={images} onClick={this.onOpenImage} />
//           {images.length >= 12 && images.length !== 0 && (
//             <Button onLoadImages={this.onLoadImages} />
//           )}
//           {images.length === 0 && (< Text text={`Photo name ${searchName} not found`} />)}
//           {showModal && (
//             <Modal onClose={this.toggleModal}>
//               {
//                 <ModalImage
//                   url={largeImageURL}
//                   id={id}
//                   alt={tags}
//                   onClick={this.onCloseModal}
//                 ></ModalImage>
//               }
//             </Modal>
//           )}
//           <ToastContainer transition={Flip} />
//         </Section>
//       );
//     }
//   }
// }
