import PropTypes from 'prop-types';
import s from './Text.module.css';

export default function Text({ text }) {
  return <p className={s.Text}>{text}</p>;
}
Text.propTypes = {
  text: PropTypes.string,
};
