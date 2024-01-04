import axios from "axios";
import { fetchStockPrices } from "../utils";
import { stockList } from "../types/stock";

// Function to fetch stock data from Polygon API
export const fetchStockData = async (n: number) => {
  try {
    const date = new Date();
    const response = await axios.get(
      `https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/${date.getFullYear()}-${date.getMonth()}-${
        date.getDay() - 1
      }?apiKey=${process.env.PolygonAPIKey}&limit=${n}`
    );

    return response.data.results;
  } catch (error: any) {
    return await fetchStockPrices();
  }
};
