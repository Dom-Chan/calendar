import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import userRoutes from './routes/users.js'
import eventRoutes from './routes/events.js'

const app = express();
dotenv.config();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(cors());
dotenv.config()

app.use('/user', userRoutes)
app.use('/event', eventRoutes)

const PORT = process.env.PORT || 3005;

mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

