import PropTypes from 'prop-types';

export default function Counter({value}) {
  return <span className="counter rounded bg-primary px-1 text-light fs-4 fw-bold">{value}</span>;
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
};
