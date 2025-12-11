import express from "express";
import { createShow, listShows, getShowById } from "../controllers/show.controller.js";
const router = express.Router();
router.post("/", createShow);
router.get("/", listShows);
router.get("/:id", getShowById);
export default router;
