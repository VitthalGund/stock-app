import path from "path";
import fs from "node:fs";
import { pathOfData, pathOfDataBackUp } from "..";
import { stock, stockList } from "../types/stock";
import { Mutex } from "async-mutex";
const mutex = new Mutex();

// Function to generate random refresh intervals between 1-5 seconds for each stock
export const generateRefreshIntervals = (count: number) => {
  const refreshIntervals: number[] = [];
  for (let i = 0; i < count; i++) {
    refreshIntervals.push(Math.floor(Math.random() * 5) + 1);
  }
  return refreshIntervals;
};

// Function to store stock data and refresh intervals in a file
export const storeDataInFile = async (data: any) => {
  if (!data) {
    return console.log("No Data given");
  }
  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
  }
  await mutex.acquire();
  try {
    const existingData = await fs.promises.readFile(pathOfData, "utf-8");
    const newData = JSON.stringify(data);

    await fs.promises.writeFile(pathOfData, newData, "utf-8");
    mutex.release();
  } catch (error: any) {
    console.error("Error writing data to file:", error.message);
  }
};

export const updateStockPrice = (stock: stock): stock => {
  return {
    T: stock.T,
    c: stock.c + Math.random() * 3,
    h: stock.n + Math.random() * 9,
    n: stock.h + Math.random() * 3,
    l: stock.c + Math.random() * 2,
    o: stock.c + Math.random() * 2,
    t: stock.v + Math.random() * 5,
    v: stock.vw + Math.random() * 4,
    vw: stock.v + Math.random() * 3,
    refreshInterval: stock.c + Math.floor(Math.random() * 3),
  };
};

// Function to update stock prices with random values
export const updateStockPrices = (data: any[]) => {
  return data.map((stock) => ({
    ...stock,
    currentPrice: stock.open + Math.random() * 10,
  }));
};

// Function to expose API endpoint to fetch stock prices from the stored file
export const fetchStockPrices = async (): Promise<stockList> => {
  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
  }
  await mutex.acquire();

  let stock: stockList = [];
  const rawData = await fs.promises.readFile(pathOfData);
  const stringData = rawData.toString().trim();
  if (!stringData) {
    return await readBackUp();
  }
  stock = JSON.parse(stringData);
  mutex.release();

  return stock;
};

export const readBackUp = async () => {
  if (mutex.isLocked()) {
    await mutex.waitForUnlock();
  }
  await mutex.acquire();
  const fileData = await fs.promises.readFile(pathOfDataBackUp);
  const stringData = fileData.toString().trim();
  mutex.release();

  return JSON.parse(stringData);
};
