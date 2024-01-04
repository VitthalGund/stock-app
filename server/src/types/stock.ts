export type stock = {
  T: string;
  v: number;
  vw: number;
  o: number;
  c: number;
  h: number;
  l: number;
  t: number;
  n: number;
  refreshInterval?: number;
};

// export type stockList = {
//   queryCount: number;
//   resultsCount: number;
//   adjusted: boolean;
//   results: stock[];
// };

export type stockList = stock[];
