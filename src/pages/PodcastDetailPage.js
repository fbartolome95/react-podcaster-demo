import {Link, useParams} from 'react-router-dom';
import {useEffect, useState, useMemo} from 'react';
import Preloader from '../components/Preloader';
import PodcastDetailCard from '../components/PodcastDetailCard';
import {
  getDisplayTimeFromMillis,
  formatDate,
  getTimestampMillis,
  isTimestampDiffMoreThanOneDay,
} from '../utils/DateTimeUtils';

export default function PodcastDetailPage() {
  const {podcastId, episodeId} = useParams();
  const [data, setData] = useState(false);
  const [description, setDescription] = useState(false);
  const episode = useMemo(() => {
    if (episodeId && data) {
      return data.find(item => Number(item.trackId) === Number(episodeId));
    }
    return false;
  }, [data, episodeId]);

  function fetchData() {
    const storeKey = `${process.env.REACT_APP_PODCAST_DETAIL_RESULT_LOCAL_STORAGE_KEY}_${podcastId}`;
    const stored = JSON.parse(localStorage.getItem(storeKey));
    const timestamp = getTimestampMillis();

    if (!stored || isTimestampDiffMoreThanOneDay(timestamp, stored.lastUpdate)) {
      fetch(
        `${process.env.REACT_APP_API_CORS_PREFFIX}${process.env.REACT_APP_PODCAST_DETAIL_ENDPOINT}${podcastId}`
      )
        .then(res => res.json())
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error:', error))
        .then(response => {
          if (response.resultCount && response.results) {
            setData(response.results);
            localStorage.setItem(
              storeKey,
              JSON.stringify({
                lastUpdate: timestamp,
                data: response.results,
              })
            );
          }
        });
    } else {
      setData(stored.data);
    }
  }

  function fetchDescription() {
    const storedResult = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_PODCAST_LIST_RESULT_LOCAL_STORAGE_KEY)
    );
    if (storedResult) {
      const storedItem = storedResult.find(item => item.id === podcastId);
      if (storedItem) {
        setDescription(storedItem.description);
      }
    }
  }

  function getDescription() {
    return {__html: episode.description};
  }

  useEffect(() => {
    fetchData();
    fetchDescription();
  }, []);

  return (
    <div className="podcast-detail">
      {data ? (
        <div className="row">
          <div className="col-3">
            <PodcastDetailCard
              id={Number(podcastId)}
              image={data[0].artworkUrl600}
              title={data[0].trackName}
              author={data[0].artistName}
              description={description}
            />
          </div>
          <div className="col-9">
            {episode ? (
              <div className="card">
                <div className="card-body p-4">
                  <h2 className="fs-4 fw-bold">{episode.trackName}</h2>
                  {
                    <p
                      className="-white-space-pre-line"
                      // eslint-disable-next-line react/no-danger
                      dangerouslySetInnerHTML={getDescription()}
                    />
                  }
                  {
                    // eslint-disable-next-line jsx-a11y/media-has-caption
                    <audio className="w-100" src={episode.episodeUrl} controls>
                      Your browser does not support the <code>audio</code> element.
                    </audio>
                  }
                </div>
              </div>
            ) : (
              <>
                <div className="card mb-4">
                  <div className="card-body fs-5 fw-bold px-3 py-2">
                    Episodes: {data[0].trackCount}
                  </div>
                </div>
                <div className="card">
                  <div className="card-body">
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">Title</th>
                          <th scope="col">Date</th>
                          <th scope="col">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.length > 0
                          ? data
                              .filter(item => item.kind === 'podcast-episode')
                              .map(item => (
                                <tr key={item.trackId}>
                                  <td>
                                    <Link
                                      className="text-decoration-none"
                                      to={`/podcast/${podcastId}/episode/${item.trackId}`}
                                    >
                                      {item.trackName}
                                    </Link>
                                  </td>
                                  <td>{formatDate(item.releaseDate)}</td>
                                  <td>{getDisplayTimeFromMillis(item.trackTimeMillis)}</td>
                                </tr>
                              ))
                          : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center m-5">
          <Preloader />
        </div>
      )}
    </div>
  );
}
