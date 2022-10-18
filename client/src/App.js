import "./App.css";
import React from "react";
import NewUser from "./Components/NewUser";
import Calendar from "./Components/Calendar";
import { format, startOfToday  } from "date-fns";
import NewEvent from "./Components/NewEvent";


function App() {
  let todayDate = startOfToday()

  return (
    <div>
      <NewUser/>
      <Calendar eventDate={todayDate}/>
      <NewEvent/>
    </div>
  );
}

export default App;
