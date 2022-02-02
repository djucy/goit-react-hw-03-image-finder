import PropTypes from 'prop-types';

export default function Text({ text }) {
  return <p>{text}</p>;
}
Text.propTypes = {
  text: PropTypes.string,
};
