import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4001;
console.log(PORT);

app.use(express.json()); // for parsing application/json data

app.use(cors({ origin: process.env.ORIGIN_URL, credentials: true }));

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`server running on port ${PORT || 4001}`);
});
