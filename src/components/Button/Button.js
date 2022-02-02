import s from './Button.module.css';
import PropTypes from 'prop-types';

export default function Button({ onLoadImages }) {
  return (
    <button type="submit" onClick={onLoadImages} className={s.Button}>
      Download more
    </button>
  );
}

Button.propTypes = {
  onLoadImages: PropTypes.func.isRequired,
};
// import { Component } from "react";

// export default class Button extends Component {

//     render() {
//         return <button type='button' onClick={ }>Downloud more</button>

//      }
