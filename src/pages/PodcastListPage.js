import {useEffect, useState, useCallback} from 'react';
import {isTimestampDiffMoreThanOneDay, getTimestampMillis} from '../utils/DateTimeUtils';
import PodcastItem from '../components/PodcastItem';
import Preloader from '../components/Preloader';
import Counter from '../components/Counter';
import InputSearch from '../components/InputSearch';

export default function PodcastListPage() {
  const [data, setData] = useState(false);
  const [displayData, setDisplayData] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
        // eslint-disable-next-line no-console
        .catch(error => console.error('Error:', error))
        .then(result => {
          if (result && result.feed && result.feed.entry) {
            const finalResult = result.feed.entry.map(item => ({
              id: item.id.attributes['im:id'],
              image: item['im:image'][2].label,
              title: item['im:name'].label,
              author: item['im:artist'].label,
              description: item.summary.label,
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
            setDisplayData(finalResult);
            setIsLoading(false);
          }
        });
    } else {
      setData(storedResult);
      setDisplayData(storedResult);
      setIsLoading(false);
    }
  }

  const handleInputSearchChange = useCallback(
    e => {
      const search = e.currentTarget.value;
      if (search) {
        setDisplayData(
          data.filter(
            item =>
              `${item.title} ${item.author}`.toUpperCase().indexOf(search.toUpperCase()) !== -1
          )
        );
      } else {
        setDisplayData(data);
      }
    },
    [data]
  );

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="podcast-list">
      <div className="row justify-content-end align-items-center">
        <div className="col-auto">
          <Counter value={displayData.length || 0} />
        </div>
        <div className="col-auto">
          <InputSearch onInput={handleInputSearchChange} />
        </div>
      </div>
      <div className="row mt-4">
        {displayData.length > 0 ? (
          displayData.map(item => (
            <PodcastItem
              key={item.id}
              id={Number(item.id)}
              author={item.author}
              image={item.image}
              title={item.title}
            />
          ))
        ) : (
          <div className="text-center m-5">
            {isLoading ? <Preloader /> : <p className="fs-4">No hay resultados</p>}
          </div>
        )}
      </div>
    </div>
  );
}
