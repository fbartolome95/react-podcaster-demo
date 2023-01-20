const dayMilliseconds = 24 * 60 * 60 * 1000;

/**
 * Get current timestamp in milliseconds
 */
export const getTimestampMillis = () => new Date().getTime();

export const isTimestampDiffMoreThanOneDay = (newTimestamp, oldTimestamp) =>
  newTimestamp - oldTimestamp > dayMilliseconds;

export const getDisplayTimeFromMillis = millis => {
  const seconds = millis / 1000;

  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  const displayH = h === 0 ? '' : `${h}:`;
  const displayM = m < 10 && h > 0 ? `0${m}:` : `${m}:`;
  const displayS = s < 10 ? `0${s}` : `${s}`;

  return `${displayH}${displayM}${displayS}`;
};

export const formatDate = datetime => new Date(datetime).toLocaleDateString('es-ES');
