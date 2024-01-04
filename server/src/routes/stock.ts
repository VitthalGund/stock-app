import express from "express";
import { fetchStockData } from "../controller/stockController";
import {
  fetchStockPrices,
  generateRefreshIntervals,
  readBackUp,
  storeDataInFile,
  updateStockPrice,
} from "../utils";
import { stock, stockList } from "../types/stock";
const router = express.Router();

const interval = new Map<string, NodeJS.Timeout>();

router.post("/info", async (req: express.Request, res: express.Response) => {
  try {
    let { no } = req.body;
    if (!no || no > 20) {
      return res
        .status(400)
        .json({ message: "missing number", success: false });
    }

    let stockData: stockList = await fetchStockData(no);
    if (stockData.length < no) {
      stockData = await readBackUp();
    }
    stockData.length = no;
    // Generate refresh intervals
    const refreshIntervals = generateRefreshIntervals(stockData.length);

    // Associate each stock with its unique refresh interval
    const stocksWithRefreshIntervals = stockData.map(
      (stock: stock, index: number) => ({
        ...stock,
        refreshInterval: refreshIntervals[index],
      })
    );

    // Store data in the backend file
    await storeDataInFile(stocksWithRefreshIntervals);
    // Set up interval to update stock prices
    stocksWithRefreshIntervals.forEach((stock, index) => {
      if (interval.has(stock.T)) {
        return;
      }

      let id = setInterval(async () => {
        const updatedStock = updateStockPrice(stock);
        const data = (await fetchStockPrices()) as stockList;
        data[index] = updatedStock;
        if (data && data[index].T === updatedStock.T) {
          storeDataInFile(data);
        }
        interval.delete(stock.T);
      }, stock.refreshInterval * 1000); // Convert refreshInterval to milliseconds
      interval.set(stock.T, id);
    });
    // Initial response with historical stock data
    res.json(stocksWithRefreshIntervals);
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
