import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import Preloader from '../components/Preloader';
import PodcastDetailCard from '../components/PodcastDetailCard';
import {
  getDisplayTimeFromMillis,
  formatDate,
  getTimestampMillis,
  isTimestampDiffMoreThanOneDay,
} from '../utils/DateTimeUtils';

export default function PodcastDetailPage() {
  const {id} = useParams();
  const [data, setData] = useState(false);
  const [description, setDescription] = useState(false);

  function fetchData() {
    const storeKey = `${process.env.REACT_APP_PODCAST_DETAIL_RESULT_LOCAL_STORAGE_KEY}_${id}`;
    const stored = JSON.parse(localStorage.getItem(storeKey));
    const timestamp = getTimestampMillis();

    if (!stored || isTimestampDiffMoreThanOneDay(timestamp, stored.lastUpdate)) {
      fetch(
        `${process.env.REACT_APP_API_CORS_PREFFIX}${process.env.REACT_APP_PODCAST_DETAIL_ENDPOINT}${id}`
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
      const storedItem = storedResult.find(item => item.id === id);
      if (storedItem) {
        setDescription(storedItem.description);
      }
    }
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
              image={data[0].artworkUrl600}
              title={data[0].trackName}
              author={data[0].artistName}
              description={description}
            />
          </div>
          <div className="col-9">
            <div className="card mb-4">
              <div className="card-body fs-5 fw-bold px-3 py-2">Episodes: {data[0].trackCount}</div>
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
                              <td>{item.trackName}</td>
                              <td>{formatDate(item.releaseDate)}</td>
                              <td>{getDisplayTimeFromMillis(item.trackTimeMillis)}</td>
                            </tr>
                          ))
                      : null}
                  </tbody>
                </table>
              </div>
            </div>
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
