import { Component } from 'react';
import searchNameApi from '../../services/searchName-api';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class SearchingGalleryItem extends Component {
  state = {
    images: [],
    status: Status.IDLE,
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.searchName;
    const nextName = this.props.searchName;
    const { page, images } = this.state;

    if (prevName !== nextName) {
      this.setState({ status: Status.PENDING });
      searchNameApi
        .fetchSearchName(nextName, page)
        .then(images =>
          this.setState({ images, page: 1, status: Status.RESOLVED }),
        )
        .catch(error => this.setState({ error, status: Status.REJECTED }));
    }
  }

  //     const { query, page } = this.state;
  //     API.getImages(query, page)
  //       .then((response) =>
  //         this.setState(({ gallery, page }) => ({
  //           gallery: [...gallery, ...response],
  //           status: "resolved",
  //           page: page + 1,
  //         }))
  //       )
  //       .catch((error) => this.state({ error, status: "rejected" }));
  //     getMoreImages = () => {
  //         const { page, images } = this.state;
  //         const { searchName } = this.props;
  // searchNameApi
  //     .fetchSearchName(searchName, page)
  //     .then(newImages => {
  //         this.setState((prevState)=>({
  //             images: [...newImages, ...prevState.images],
  //             page: prevState.page + 1,
  //             status: Status.RESOLVED
  //         }))
  //   .catch(error => this.setState({ error, status: Status.REJECTED }));
  //     })
  //     }
  //     loadMoreImages = () => {
  //         this.getMoreImages()
  //      }
  // searchImages = () => {
  //     const { query, page } = this.state;
  //     API.getImages(query, page)
  //       .then((response) =>
  //         this.setState(({ gallery, page }) => ({
  //           gallery: [...gallery, ...response],
  //           status: "resolved",
  //           page: page + 1,
  //         }))
  //       )
  //       .catch((error) => this.state({ error, status: "rejected" }));
  //   };

  //   onLoadMore = () => {
  //     this.searchImages();
  //   };

  render() {
    const { images, status } = this.state;

    if (status === 'idle') {
      return (
        <div>
          <p>Please, enter pictures' name...</p>
        </div>
      );
    }
    if (status === 'pending') {
      return (
        <div>
          <p>Please,wait. We are searching the pictures for you</p>
        </div>
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
        <>
          <ImageGallery images={images} />
        </>
      );
    }
  }
}

// componentDidUpdate(prevProps, prevState) {
//     const prevName = prevProps.pokemonName;
//     const nextName = this.props.pokemonName;

//     if (prevName !== nextName) {
//       this.setState({ status: Status.PENDING });

//       setTimeout(() => {
//         pokemonAPI
//           .fetchPokemon(nextName)
//           .then(pokemon => this.setState({ pokemon, status: Status.RESOLVED }))
//           .catch(error => this.setState({ error, status: Status.REJECTED }));
//       }, 3000);
//     }
//   }

// import PokemonDataView from './PokemonDataView';
// import PokemonErrorView from './PokemonErrorView';
// import PokemonPendingView from './PokemonPendingView';
