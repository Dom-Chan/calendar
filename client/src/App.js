import "./App.css";
import React, { useState } from "react";
import NewUser from "./Components/NewUser";
import Calendar from "./Components/Calendar";
import { format, startOfToday } from "date-fns";
import NewEvent from "./Components/NewEvent";
import { IoPersonAddSharp } from "react-icons/io5";

function App() {
  const [openUsers, setOpenUsers] = useState(false)
  let todayDate = startOfToday();

  return (
    <div className="flex flex-col w-full font-sans justify-center items-center">
      <h1 className=" font-bold md:text-5xl mb-2 md:mb-8">CALENDAR</h1>
      <button onClick={()=>setOpenUsers(true)}><IoPersonAddSharp/></button>

      {openUsers && <NewUser close={setOpenUsers}/>}
      <Calendar eventDate={todayDate} />
    </div>
  );
}

export default App;
