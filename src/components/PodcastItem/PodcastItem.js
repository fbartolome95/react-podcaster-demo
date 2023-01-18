import PropTypes from 'prop-types';
import './PodcastItem.scss';

export default function PodcastItem({image, title, author}) {
  return (
    <div className="col-3">
      <div className="podcast-list__item text-center border">
        <img
          className="podcast-list__image object-fit-cover rounded-circle"
          src={image}
          alt={title}
        />
        <p className="text-uppercase mb-2">{title}</p>
        <p className="text-secondary">Author: {author}</p>
      </div>
    </div>
  );
}

PodcastItem.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
