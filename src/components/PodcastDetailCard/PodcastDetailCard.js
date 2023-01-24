import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';

export default function PodcastDetailCard({id, image, title, author, description}) {
  return (
    <div className="card">
      <img src={image} className="mx-5 mt-4 rounded" alt={title} />
      <div className="card-body">
        <hr />
        <h5 className="fw-bold">
          <Link className="text-decoration-none" to={`/podcast/${id}`}>
            {title}
          </Link>
        </h5>
        <p className="fst-italic">
          by <Link to={`/podcast/${id}`}>{author}</Link>
        </p>
        {description ? (
          <>
            <hr />
            <p className="fw-bold">Description</p>
            <p className="fst-italic">{description}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}

PodcastDetailCard.propTypes = {
  id: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
