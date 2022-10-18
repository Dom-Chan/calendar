import "./App.css";
import React from "react";


function App() {
  const createUser = () => {
    console.log("creating user...");
    fetch(`http://localhost:3005/createUser`, {
      method: "POST",
      body: JSON.stringify({
        username: "domchan",
        name: "Do Chan",
        events: ["aaa", "dddd"],
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div onClick={createUser} className="">
      dchan
    </div>
  );
}

export default App;
