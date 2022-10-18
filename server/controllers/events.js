import eventModel from "../models/eventModel.js";
import {
  formatISO,
  parseISO,
  isAfter,
  isBefore,
  isEqual,
  startOfToday,
} from "date-fns";

export const getEvents = async (req, res) => {
  console.log("getting events...");

  try {
    const allEvents = await eventModel.find();
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createEvent = async (req, res) => {
  console.log("making event...");
  let todayDate = startOfToday();

  const { description, startDate, endDate, users } = req.body;

  let checkAM = startDate.substring(0, 11).concat("00:00:00.000Z");
  let checkPM = startDate.substring(0, 11).concat("12:00:00.000Z");

  //check if event is past current date/time
  if (isAfter(parseISO(startDate), todayDate)) {
    console.log("pass 1");
    if (
      isAfter(parseISO(startDate), parseISO(checkAM)) &&
      isBefore(parseISO(startDate), parseISO(checkPM)) &&
      isAfter(parseISO(endDate), parseISO(checkAM)) &&
      isBefore(parseISO(endDate), parseISO(checkPM))
    ) {
      console.log("pass 2");
    } else {
      console.log("fail 2");
      return res
        .json({ message: "Cant create event before 8am and after 8pm" });
    }
  } else {
    console.log("fail 1");
    return res.json({ message: "Cant create event past current time" });
  }

  //console.log(isAfter(parseISO(startDate), new Date("2022-10-20T00:00:00.000Z")));
  //8am is 2022-10-19T00:00:00.000Z
  //8pm is 2022-10-19T12:00:00.000Z

  // const newEvent = eventModel({
  //   description,
  //   startDate,
  //   endDate,
  //   users,
  // });

  // try {
  //   await newEvent.save();
  //   res.status(201).json(newEvent);
  // } catch (error) {
  //   res.status(409).json({ message: error.message });
  // }
};
