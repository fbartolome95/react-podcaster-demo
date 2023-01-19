import PropTypes from 'prop-types';

export default function InputSearch({onInput}) {
  return (
    <input
      className="form-control"
      type="search"
      placeholder="Filter podcasts..."
      aria-label="Filter podcasts"
      onInput={onInput}
    />
  );
}

InputSearch.propTypes = {
  onInput: PropTypes.func.isRequired,
};
