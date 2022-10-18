import React from "react";
import { useState, useEffect } from "react";
import {
  format,
  startOfToday,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  getHours,
  parse,
  parseISO,
  isEqual,
  getMonth,
  getDate,
  getYear,
  formatISO,
} from "date-fns";

const Calendar = ({ eventDate }) => {
  const [selectedDate, setselectedDate] = useState();

  let days = eachDayOfInterval({
    start: startOfMonth(eventDate),
    end: endOfMonth(eventDate),
  });

  useEffect(() => {
    fetch(`http://localhost:3005/event/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((events) =>{ 
        // let str = parseISO(events[0].startDate)
        // console.log(str)
        // console.log(events[0].startDate)
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="flex flex-col max-w-md p-5">
      {/* Month Label */}
      <div className="flex bg-red-500 rounded-md p-2 font-bold rounded-b-none">
        <h2>{format(eventDate, "MMMM yyyy")}</h2>
      </div>
      {/* Days of the week labels M T W etc */}
      <div className="bg-gray-100 rounded-md p-3">
        <div className="grid grid-cols-7 text-xs font-bold leading-6 text-center text-gray-500">
          <div>S</div>
          <div>M</div>
          <div>T</div>
          <div>W</div>
          <div>T</div>
          <div>F</div>
          <div>S</div>
        </div>
        {/* Days rendered from month */}
        <div className="grid grid-cols-7 mt-2 text-sm text-center">
          {days.map((day, index) => (
            <div
              key={day.toString()}
              className={`rounded-md hover:bg-gray-400 mt-3 ${
                colClasses[getDay(day)]
              }`}
            >
              <button onClick={() => setselectedDate(day)}>
                {format(day, "d")}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

let colClasses = [
  "col-start-1",
  "col-start-2",
  "col-start-3",
  "col-start-4",
  "col-start-5",
  "col-start-6",
  "col-start-7",
];

export default Calendar;
