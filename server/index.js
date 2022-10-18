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

app.use('/createUser', userRoutes)
app.use('/event', eventRoutes)

const PORT = process.env.PORT || 3005;
const CONNECTION_URL =
  'mongodb+srv://dc_dev:DCdevelopment22@cluster0.s6tfohe.mongodb.net/?retryWrites=true&w=majority';

mongoose
  .connect(CONNECTION_URL)
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

