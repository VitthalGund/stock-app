import express from "express";
import Stock from "./routes/stock";
const app = express();
const PORT = process.env.PORT || 3000;
import path from "path";
import cors from "cors";
import { allowedOrigins } from "./config/allowedOrigins";
import "dotenv/config";
export const pathOfData = path.join(__dirname, "/data/stock.json");

// Cross Origin Resource Sharing
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: true }));

// built-in middleware for json
app.use(express.json());

app.use("/stocks", Stock);
app.get("/", (req, res) => {
  res.send("MERN Stock App Backend");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
