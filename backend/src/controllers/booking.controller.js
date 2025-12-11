import { pool } from "../config/db.js";

export const bookSeats = async (req, res) => {
  const { showId, seats } = req.body;
  if (!showId || !seats || seats <= 0) {
    return res.status(400).json({ error: "Invalid input" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const showQ = await client.query("SELECT * FROM shows WHERE id=$1 FOR UPDATE", [showId]);
    if (showQ.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ status: "FAILED", message: "Show not found" });
    }
    const show = showQ.rows[0];
    const available = show.total_seats - show.booked_seats;
    if (seats > available) {
      await client.query("ROLLBACK");
      return res.status(409).json({ status: "FAILED", message: "Not enough seats", available });
    }
    const insertQ = await client.query(
      "INSERT INTO bookings (show_id, seats, status) VALUES ($1, $2, 'PENDING') RETURNING *",
      [showId, seats]
    );
    const booking = insertQ.rows[0];
    await client.query("UPDATE shows SET booked_seats = booked_seats + $1 WHERE id=$2", [seats, showId]);
    await client.query("UPDATE bookings SET status='CONFIRMED' WHERE id=$1", [booking.id]);
    await client.query("COMMIT");
    return res.status(201).json({ status: "CONFIRMED", bookingId: booking.id });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("bookSeats error:", err);
    return res.status(500).json({ status: "FAILED", error: err.message });
  } finally {
    client.release();
  }
};

export const listBookings = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM bookings ORDER BY created_at DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error("listBookings error:", err);
    res.status(500).json({ error: err.message });
  }
};

export const getBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [id]);
    if (!result.rows.length) return res.status(404).json({ error: "Booking not found" });
    res.json(result.rows[0]);
  } catch (err) {
    console.error("getBooking error:", err);
    res.status(500).json({ error: err.message });
  }
};
