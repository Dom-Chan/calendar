import React from "react";
import { useState, useEffect } from "react";
import { format, startOfToday, parseISO, formatISO, isBefore } from "date-fns";
import { createEvent } from "../API/event";

const NewEvent = () => {
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [users, setUsers] = useState([""]);

  // NEWEVENT PART
  let todayDate = startOfToday();
  const [startMin, setStartMin] = useState(
    formatISO(todayDate).substring(0, 16)
  );
  const [endMinMax, setEndMinMax] = useState();

  // TESTING
  //console.log(formatISO(todayDate));
  //console.log(parseISO(formatISO(todayDate)));

  //console.log(formatISO(todayDate).substring(0, 16));

  const setMinMax = (datetime) => {
    let now = new Date();
    let min = formatISO(now).substring(0, 16);
    setStartMin(min);

    let maxTimeString = datetime.substring(0, 11).concat("12:00");
    console.log(min)
    setEndMinMax(maxTimeString);
  };

  // check if start date is before end
  //   useEffect(() => {
  //     if (!isBefore(eventStart, eventEnd) && eventStart !== undefined) {
  //         alert("starting time must be before ending time")
  //     }
  //   }, [eventEnd])

  return (
    <div className="flex flex-col max-w-md p-5 items-center">
      {/* Popup of time selection */}
      <div className="bg-gray-100 rounded-md p-3 flex flex-col">
        <h3>Select Time</h3>

        <input
          type="datetime-local"
          min={startMin}
          onChange={(e) => {
            setMinMax(e.target.value);
            setEventStart(parseISO(e.target.value));
            //setEventStart(formatISO(parseISO(e.target.value)));
          }}
        ></input>

        <input
          type="datetime-local"
          min={endMinMax}
          
          onChange={(e) => {
            setEventEnd(parseISO(e.target.value));
            //setEventEnd(formatISO(parseISO(e.target.value)));
          }}
        ></input>
        <button
          className="bg-green-500 rounded-md"
          onClick={() => {
            createEvent({ eventStart, eventEnd, users });
            console.log(eventStart, eventEnd, users);
          }}
        >
          Create
        </button>
      </div>
    </div>
  );
};

export default NewEvent;
