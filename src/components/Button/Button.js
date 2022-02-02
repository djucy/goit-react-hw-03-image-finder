import s from './Button.module.css';

export default function Button({ onLoadImages }) {
  return (
    <button type="submit" onClick={onLoadImages} className={s.Button}>
      Download more
    </button>
  );
}

// import { Component } from "react";

// export default class Button extends Component {

//     render() {
//         return <button type='button' onClick={ }>Downloud more</button>

//      }
