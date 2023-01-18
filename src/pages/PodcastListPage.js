import {useEffect, useState} from 'react';
import {isTimestampDiffMoreThanOneDay, getTimestampMillis} from '../utils/DateTimeUtils';
import PodcastItem from '../components/PodcastItem';
import Preloader from '../components/Preloader';
import Counter from '../components/Counter';
import InputSearch from '../components/InputSearch';

export default function PodcastListPage() {
  const [data, setData] = useState(false);

  function fetchData() {
    const storedResult = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_PODCAST_LIST_RESULT_LOCAL_STORAGE_KEY)
    );
    const timestamp = getTimestampMillis();
    const lastUpdateTimestamp = localStorage.getItem(
      process.env.REACT_APP_PODCAST_LIST_UPDATED_AT_LOCAL_STORAGE_KEY
    );

    if (
      !storedResult ||
      !lastUpdateTimestamp ||
      isTimestampDiffMoreThanOneDay(timestamp, lastUpdateTimestamp)
    ) {
      fetch(process.env.REACT_APP_PODCAST_LIST_ENDPOINT)
        .then(result => result.json())
        .then(result => {
          if (result && result.feed && result.feed.entry) {
            const finalResult = result.feed.entry.map(item => ({
              id: item.id.attributes['im:id'],
              image: item['im:image'][2].label,
              title: item.title.label,
              author: item['im:artist'].label,
            }));
            localStorage.setItem(
              process.env.REACT_APP_PODCAST_LIST_RESULT_LOCAL_STORAGE_KEY,
              JSON.stringify(finalResult)
            );
            localStorage.setItem(
              process.env.REACT_APP_PODCAST_LIST_UPDATED_AT_LOCAL_STORAGE_KEY,
              timestamp
            );
            setData(finalResult);
          }
        });
    } else {
      setData(storedResult);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="podcast-list">
      <div className="row justify-content-end align-items-center">
        <div className="col-auto">
          <Counter value={data.length || 0} />
        </div>
        <div className="col-auto">
          <InputSearch />
        </div>
      </div>
      <div className="row mt-4">
        {data ? (
          data.map(item => (
            <PodcastItem key={item.id} author={item.author} image={item.image} title={item.title} />
          ))
        ) : (
          <div className="text-center m-5">
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
}
