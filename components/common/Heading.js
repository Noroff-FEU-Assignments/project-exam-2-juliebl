import PropTypes from 'prop-types';

function Heading({ text }) {
  return <h1 className="font-bold text-4xl mt-20 mb-10 text-center">{text}</h1>;
}

Heading.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Heading;
