import express from "express";
import { bookSeats, listBookings, getBooking } from "../controllers/booking.controller.js";
const router = express.Router();
router.post("/", bookSeats);
router.get("/", listBookings);
router.get("/:id", getBooking);
export default router;
