const inflStat = [
  3.05,
  4.27,
  2.52,
  5.38,
  12.91,
  11.36,
  6.45,
  6.58,
  6.1,
  8.78,
  8.8,
  13.28,
  11.87,
  9,
  10.91,
  11.74,
  11.99,
  15.06,
  18.58,
  20.2,
];

const inflPer20Years = inflStat.reduce((acc, cur) => acc * (1 + cur / 100), 1);
const inflPerYear = Math.pow(inflPer20Years, 1 / 20);

export default inflPerYear;
