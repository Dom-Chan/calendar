import React from "react";
import { useState } from "react";
import { createUser } from "../API/user";

const NewUser = () => {
  const [username, setUserName] = useState();
  
  
  return (
    <div className="flex flex-col max-w-max p-5">
      <input
        onChange={(e) => setUserName(e.target.value)}
        className="border-2 rounded-md text-center"
        type="text"
        placeholder="user name"
      ></input>
      <button
        onClick={() => createUser({username})}
        className="bg-green-600 text-center text-white rounded-md"
      >
        Add User
      </button>
    </div>
  );
};

export default NewUser;
