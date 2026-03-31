const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const pool = require("./db/pool");
const fallerosRoutes = require("./routes/fallerosRoutes");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "FRM backend running" });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "Database connected",
      now: result.rows[0].now,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Database connection failed",
      error: error.message,
    });
  }
});

app.use("/api/falleros", fallerosRoutes);

module.exports = app;
