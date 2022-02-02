import PropTypes from 'prop-types';
import { Component } from 'react';
import s from './ModalImage.module.css';

export default class ModalImage extends Component {
  render() {
    const { url, id, alt, onCloseModal } = this.props;
    return (
      <img
        className={s.ModalImg}
        src={url}
        alt={alt}
        id={id}
        onClick={onCloseModal}
      />
    );
  }
}

ModalImage.propTypes = {
  url: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  alt: PropTypes.string.isRequired,
};

// export default function ModalImage({ url, id, alt, onCloseModal }) {

//     return (<img src={url} alt={ alt} id={id} onClick={onCloseModal} width="300"height="200"/>)
// };

// ModalImage.propTypes = {
//     url: PropTypes.string.isRequired,
//     id: PropTypes.number.isRequired,
//     alt: PropTypes.string.isRequired,
//     onCloseModal:PropTypes.object.isRequired,
// }
