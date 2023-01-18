const dayMilliseconds = 24 * 60 * 60 * 1000;

/**
 * Get current timestamp in milliseconds
 */
export const getTimestampMillis = () => new Date().getTime();

export const isTimestampDiffMoreThanOneDay = (newTimestamp, oldTimestamp) =>
  newTimestamp - oldTimestamp > dayMilliseconds;
