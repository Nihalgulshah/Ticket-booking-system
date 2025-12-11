import { pool } from "../config/db.js";

export const createShow = async (req, res) => {
  const { name, start_time, total_seats } = req.body;
  if (!name || !start_time || !total_seats) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    const result = await pool.query(
      `INSERT INTO shows (name, start_time, total_seats) VALUES ($1, $2, $3) RETURNING *`,
      [name, start_time, total_seats]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("createShow error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const listShows = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM shows ORDER BY start_time`);
    res.json(result.rows);
  } catch (err) {
    console.error("listShows error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getShowById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM shows WHERE id=$1`, [id]);
    if (!result.rows.length) return res.status(404).json({ error: "Show not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("getShowById error:", err);
    res.status(500).json({ error: err.message });
  }
};
