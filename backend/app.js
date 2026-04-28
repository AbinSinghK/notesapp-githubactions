const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "postgres",
  database: "notes",
  password: "postgres",
  port: 5432,
});

app.get("/notes", async (req, res) => {
  const result = await pool.query("SELECT * FROM notes");
  res.json(result.rows);
});

app.post("/notes", async (req, res) => {
  const { text } = req.body;
  await pool.query("INSERT INTO notes(text) VALUES($1)", [text]);
  res.json({ message: "added" });
});

app.listen(5000, "0.0.0.0", () =>
  console.log("Backend running")
);