import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import showRoutes from "./routes/show.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();
app.use(express.json());
app.use(cors({ origin: (o, cb) => cb(null, true) }));

app.get("/", (req, res) => res.json({ ok: true, service: "modex-backend" }));

app.use("/shows", showRoutes);
app.use("/bookings", bookingRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
