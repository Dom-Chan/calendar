import express from "express";
import { createEvent, getEvents } from "../controllers/events.js";

const router = express.Router();
router.post('/create', createEvent)
router.get('/', getEvents)

export default router;