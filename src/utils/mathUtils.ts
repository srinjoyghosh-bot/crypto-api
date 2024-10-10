export const stddev = (values: number[]): number => {
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const squareDiffs = values.map((value) => Math.pow(value - average, 2));
  const avgSquareDiff =
    squareDiffs.reduce((sum, value) => sum + value, 0) / squareDiffs.length;
  return Math.sqrt(avgSquareDiff);
};
