import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createUser, getUsers } from "../API/user";

const NewUser = ({close}) => {
  const [username, setUserName] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    fetch(`http://localhost:3005/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res_users) => setUsers(res_users))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div onClick={()=>close(false)} className="bg-gray-100 inset-0 rounded-md flex flex-col p-5 items-center justify-center fixed z-30">
    <div className="bg-gray-100 rounded-md flex flex-col max-w-fit p-5 items-center justify-center">
      <div className="flex flex-col z-50 overflow-auto">
        {users && users.map((user) => (
          <p className="pl-2" key={user.user}>{user.user}</p>
        ))}
      </div>
      <input
        onChange={(e) => setUserName(e.target.value)}
        className="border-2 rounded-md text-center"
        type="text"
        placeholder="user name"
      ></input>
      <button
        onClick={() => {createUser({ username }); close(false)}}
        className="bg-secondary text-center text-white rounded-md w-full"
      >
        Add User
      </button>
    </div>
    </div>
  );
};

export default NewUser;
