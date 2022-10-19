import React from "react";
import { useState, useEffect } from "react";
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  getDay,
  isSameDay,
  parse,
  add,
} from "date-fns";
import { parseISO } from "date-fns/esm";
import NewEvent from "./NewEvent";
import { BsTrash } from "react-icons/bs";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";

const Calendar = ({ eventDate }) => {
  const [currentMonth, setCurrentMonth] = useState(
    format(eventDate, "MMMM yyyy")
  );
  const [selectedDate, setselectedDate] = useState();
  const [selectedEventModal, setSelectedEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [events, setEvents] = useState();
  const [createEventModal, setCreateEventModal] = useState(false);
  let create = "create";
  let edit = "edit";
  let firstDayofCurMonth = parse(currentMonth, "MMMM yyyy", new Date());

  let days = eachDayOfInterval({
    start: firstDayofCurMonth,
    end: endOfMonth(firstDayofCurMonth),
  });

  useEffect(() => {
    fetch(`http://localhost:3005/event/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res_events) => {
        setEvents(res_events);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteEvent = ({ event }) => {
    let _id = event._id;
    fetch(`http://localhost:3005/event/del/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        console.log(msg);
        let updatedEvents = events.filter((ev) => ev !== event);
        setEvents(updatedEvents);
      })
      .catch((err) => console.log(err));
  };

  const nextMonth = () => {
    let firstDayofCurMonth = parse(currentMonth, "MMMM yyyy", new Date());
    let firstDayofNextMonth = add(firstDayofCurMonth, { months: 1 });
    setCurrentMonth(format(firstDayofNextMonth, "MMMM yyyy"));
  };

  const prevMonth = () => {
    let firstDayofCurMonth = parse(currentMonth, "MMMM yyyy", new Date());
    let firstDayofNextMonth = add(firstDayofCurMonth, { months: -1 });
    setCurrentMonth(format(firstDayofNextMonth, "MMMM yyyy"));
  };

  return (
    <div className="flex flex-col md:flex-row w-full justify-center items-center">
      <div className="flex flex-col max-w-md p-5 w-full md:border-r-2">
        {/* Month Label */}
        <div className="flex bg-secondary rounded-md p-2 font-bold rounded-b-none">
          <h2>{currentMonth}</h2>
          <button className="ml-3 hover:bg-secondaryShade" onClick={prevMonth}>
            <GrFormPrevious />
          </button>
          <button className=" hover:bg-secondaryShade" onClick={nextMonth}>
            <GrFormNext />
          </button>
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
                <button
                  onClick={() => {
                    setselectedDate({ day });
                  }}
                >
                  {format(day, "d")}
                </button>
                {events && events.some((event) =>
                  isSameDay(parseISO(event.startDate), day)
                ) && <div className="w-1 h-1 bg-secondary mx-auto"></div>}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* DISPLAY EVENTS HERE */}
      <div className="flex flex-col max-w-md p-5">
        <div className="max-w-md flex flex-col rounded-md p-3 mb-2">
          {events &&
            selectedDate &&
            events
              .filter((event) =>
                isSameDay(parseISO(event.startDate), selectedDate.day)
              )
              .map((event) => (
                <div className="flex rounded-md">
                  <div
                    key={event._id}
                    className="flex flex-col w-full rounded-md border-2 border-black p-2 text-sm mb-1 cursor-pointer"
                    onClick={() => {
                      setSelectedEvent(event);
                      setSelectedEventModal(true);
                    }}
                  >
                    {format(parseISO(event.startDate), "MMM dd h:mm")} to{" "}
                    {format(parseISO(event.endDate), "h:mm")}
                  </div>
                  <button
                    key={event.startDate}
                    className=" ml-3 hover:bg-secondary px-1 py-2 w-6 h-6 m-auto rounded-full"
                    onClick={() => {
                      console.log(event);
                      deleteEvent({ event });
                    }}
                  >
                    <BsTrash />
                  </button>
                </div>
              ))}
        </div>

        <button
          className="rounded-md p-2 max-w-max bg-secondaryShade self-end"
          onClick={() => setCreateEventModal(true)}
        >
          Create Event
        </button>
      </div>
      {selectedEventModal && (
        <NewEvent
          setCreateEventModal={setSelectedEventModal}
          instruction={edit}
          event={selectedEvent}
        />
      )}
      {createEventModal && (
        <NewEvent
          setCreateEventModal={setCreateEventModal}
          instruction={create}
        />
      )}
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
