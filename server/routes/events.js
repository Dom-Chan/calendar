import express from "express";
import { createEvent, getEvents, editEvent, deleteEvent } from "../controllers/events.js";

const router = express.Router();
router.post('/create', createEvent)
router.put('/edit', editEvent)
router.delete('/del/:_id', deleteEvent)
router.get('/', getEvents)

export default router;