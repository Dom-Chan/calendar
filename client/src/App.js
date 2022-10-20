import "./App.css";
import React, { useState, useEffect } from "react";
import NewUser from "./Components/NewUser";
import Calendar from "./Components/Calendar";
import { format, startOfToday } from "date-fns";
import NewEvent from "./Components/NewEvent";
import { IoPersonAddSharp } from "react-icons/io5";
import { BsCalendar2PlusFill } from "react-icons/bs";

function App() {
  const [openUsers, setOpenUsers] = useState(false);
  const [createEventModal, setCreateEventModal] = useState(false);
  
  let create = "create";
  let todayDate = startOfToday();

  return (
    <div className="flex flex-col w-full h-full font-sans justify-center items-center">
      <h1 className=" font-bold md:text-5xl mb-2 md:mb-8 mt-8">CALENDAR</h1>

      {openUsers && <NewUser close={setOpenUsers} />}
      <Calendar eventDate={todayDate} />
      <div className="flex w-full items-center justify-center mt-4">
        <div
          className="flex items-center rounded-md p-2 max-w-max bg-secondaryShade cursor-pointer mr-4 md:mr-96"
          onClick={() => setOpenUsers(true)}
        >
          <p className="hidden sm:block mr-2">Create User</p> <IoPersonAddSharp />
        </div>
        
        <div
          className="flex items-center rounded-md p-2 max-w-max bg-secondaryShade cursor-pointer"
          onClick={() => setCreateEventModal(true)}
        >
          <p className="mr-2">Create Event</p> <BsCalendar2PlusFill />
        </div>
      </div>
      {createEventModal && (
        <NewEvent
          setCreateEventModal={setCreateEventModal}
          instruction={create}
      
        />
      )}
    </div>
  );
}

export default App;
