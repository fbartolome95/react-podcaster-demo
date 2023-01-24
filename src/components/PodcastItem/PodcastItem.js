import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import './PodcastItem.scss';

export default function PodcastItem({id, image, title, author}) {
  return (
    <div className="col-3">
      <Link className="text-decoration-none" to={`/podcast/${id}`}>
        <div className="podcast-list__item text-center border">
          <img
            className="podcast-list__image object-fit-cover rounded-circle"
            src={image}
            alt={title}
          />
          <p className="text-black text-uppercase mb-2">{title}</p>
          <p className="text-secondary">Author: {author}</p>
        </div>
      </Link>
    </div>
  );
}

PodcastItem.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};
