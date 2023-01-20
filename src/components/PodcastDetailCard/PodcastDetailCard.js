import PropTypes from 'prop-types';

export default function PodcastDetailCard({image, title, author, description}) {
  return (
    <div className="card">
      <img src={image} className="mx-5 mt-4 rounded" alt={title} />
      <div className="card-body">
        <hr />
        <h5 className="fw-bold">{title}</h5>
        <p className="fst-italic">by {author}</p>
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
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
