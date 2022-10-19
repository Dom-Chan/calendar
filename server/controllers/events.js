import eventModel from "../models/eventModel.js";
import {
  formatISO,
  parseISO,
  isAfter,
  isBefore,
  isEqual,
  startOfToday,
  isSameDay,
} from "date-fns";

//get all events
export const getEvents = async (req, res) => {
  try {
    const allEvents = await eventModel.find();
    res.status(200).json(allEvents);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//delete event
export const deleteEvent = async (req, res) => {
  console.log("deleting....")
  const { _id } = req.params;
  try {
    const newEvent = await eventModel.findByIdAndDelete(_id);
    res.status(201).json({ message: "Event Deleted" });
  } catch (error) {
    console.log(error);
    res.status(409).json({ message: error.message });
  }
};

// create event
export const createEvent = async (req, res) => {
  const { description, startDate, endDate, users } = req.body;
  let todayDate = startOfToday();

  //check if dates were selected
  if (startDate === undefined || endDate === undefined) {
    console.log("undefined");
    res.status(403).json({ message: "Undefined no dates selected" });
  } else {
    let checkAM = startDate.substring(0, 11).concat("00:00:00.000Z");
    let checkPM = startDate.substring(0, 11).concat("12:00:00.000Z");

    if (users.length > 0 && users.length < 10) {
      //check if event is past current date/time
      if (isAfter(parseISO(startDate), todayDate)) {
        console.log("pass 1");
        //check if event is between 8am-8pm and if dates are in same day
        if (
          isAfter(parseISO(startDate), parseISO(checkAM)) &&
          isBefore(parseISO(startDate), parseISO(checkPM)) &&
          isAfter(parseISO(endDate), parseISO(checkAM)) &&
          isBefore(parseISO(endDate), parseISO(checkPM)) &&
          isSameDay(parseISO(startDate), parseISO(endDate))
        ) {
          console.log("pass 2");
          //check if event overlaps with other events
          try {
            eventModel.find().then((events) => {
              let result = events.some(
                (eventDate) =>
                  (isAfter(parseISO(startDate), eventDate.startDate) &&
                    isBefore(parseISO(startDate), eventDate.endDate)) ||
                  isEqual(parseISO(startDate), eventDate.startDate)
              );
              console.log(result);
              if (result) {
                console.log("overlap");
                res
                  .status(403)
                  .json({ message: "Overlapping events are not allowed" });
              } else {
                const newEvent = eventModel({
                  description,
                  startDate,
                  endDate,
                  users,
                });

                try {
                  newEvent
                    .save()
                    .then(() =>
                      res.status(201).json({ message: "Event Added!" })
                    );
                } catch (error) {
                  res.status(409).json({ message: error.message });
                }
              }
            });
          } catch (error) {
            console.log("cant retreive events");
          }
        } else {
          console.log("fail 2");
          return res.json({
            message: "Cant create event before 8am and after 8pm",
          });
        }
      } else {
        console.log("fail 1");
        return res.json({ message: "Cant create event past current time" });
      }
    } else {
      return res.json({ message: "invalid no of users" });
    }
  }
};

// edit event
export const editEvent = async (req, res) => {
  const { _id, description, startDate, endDate, users } = req.body;
  console.log(req.body)
  let todayDate = startOfToday();
  

  //check if dates were selected
  if (startDate === undefined || endDate === undefined) {
    console.log("undefined");
    res.status(403).json({ message: "Undefined no dates selected" });
  } else {
    let checkAM = startDate.substring(0, 11).concat("00:00:00.000Z");
    let checkPM = startDate.substring(0, 11).concat("12:00:00.000Z");

    if (users.length > 0 && users.length < 10) {
      //check if event is past current date/time
      if (isAfter(parseISO(startDate), todayDate)) {
        console.log("pass 1");
        //check if event is between 8am-8pm and if dates are in same day
        if (
          isAfter(parseISO(startDate), parseISO(checkAM)) &&
          isBefore(parseISO(startDate), parseISO(checkPM)) &&
          isAfter(parseISO(endDate), parseISO(checkAM)) &&
          isBefore(parseISO(endDate), parseISO(checkPM)) &&
          isSameDay(parseISO(startDate), parseISO(endDate))
        ) {
          console.log("pass 2");
          //check if event overlaps with other events
          try {
            eventModel.find().then((events) => {
              let result = events.some(
                (eventDate) =>
                  (isAfter(parseISO(startDate), eventDate.startDate) &&
                    isBefore(parseISO(startDate), eventDate.endDate)) ||
                  isEqual(parseISO(startDate), eventDate.startDate)
              );
              console.log(result);
              if (result) {
                console.log("overlap");
                res
                  .status(403)
                  .json({ message: "Overlapping events are not allowed" });
              } else {
                const newEvent = ({
                  description,
                  startDate,
                  endDate,
                  users,
                });

                try {
                  
                  eventModel
                    .findByIdAndUpdate(_id, newEvent, { new: true })

                    .then(() =>
                      res.status(201).json({ message: "Event Updated!" })
                    );
                } catch (error) {
                  res.status(409).json({ message: error.message });
                }
              }
            });
          } catch (error) {
            console.log("cant retreive events");
          }
        } else {
          console.log("fail 2");
          return res.json({
            message: "Cant create event before 8am and after 8pm",
          });
        }
      } else {
        console.log("fail 1");
        return res.json({ message: "Cant create event past current time" });
      }
    } else {
      return res.json({ message: "invalid no of users" });
    }
  }
};
