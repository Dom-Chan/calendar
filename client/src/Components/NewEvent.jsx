import React from "react";
import { useState, useEffect } from "react";
import { format, startOfToday, parseISO, formatISO, isBefore } from "date-fns";
import { IoPersonAddSharp } from "react-icons/io5";
import { AiOutlineClose } from "react-icons/ai";
import Result from "./Result";

const NewEvent = ({ setCreateEventModal, instruction, event }) => {
  const [eventStart, setEventStart] = useState();
  const [eventEnd, setEventEnd] = useState();
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [userPool, setUserPool] = useState([]);
  const [result, setResult] = useState();
  const [addUserModal, setAddUserModal] = useState(false);
  const [resultModal, setResultModal] = useState(false);
  const [endMinMax, setEndMinMax] = useState();
  const todayDate = startOfToday();
  const [startMin, setStartMin] = useState(
    formatISO(todayDate).substring(0, 16)
  );

  useEffect(() => {
    fetch(`http://localhost:3005/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res_users) => {
        setUsers(res_users);
        setUserPool(res_users);
      })
      .catch((err) => console.log(err));
  }, []);

  const setMinMax = (datetime) => {
    let now = new Date();
    let min = formatISO(now).substring(0, 16);
    setStartMin(min);

    let maxTimeString = datetime.substring(0, 11).concat("12:00");
    setEndMinMax(maxTimeString);
  };

  const handleRemoveUser = (remove) => {
    let newPool = userPool.filter((user) => user.user !== remove);
    setUserPool(newPool);
  };

  const handleSelectedUser = (add) => {
    setSelectedUsers([...selectedUsers, add]);
  };

  const createEvent = ({ eventStart, eventEnd, selectedUsers }) => {
    fetch(`http://localhost:3005/event/create`, {
      method: "POST",
      body: JSON.stringify({
        description: "",
        startDate: eventStart,
        endDate: eventEnd,
        users: selectedUsers,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        setResult(msg.message);
        setResultModal(true);
        console.log(msg);
      })
      .catch((err) => console.log(err));
  };

  const editEvent = ({ eventStart, eventEnd, selectedUsers }) => {
    fetch(`http://localhost:3005/event/edit`, {
      method: "PUT",
      body: JSON.stringify({
        _id: event._id,
        description: "",
        startDate: eventStart,
        endDate: eventEnd,
        users: selectedUsers,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((msg) => {
        setResult(msg.message);
        setResultModal(true);
        console.log(msg);
      })
      .catch((err) => console.log(err));
  };

  const Modal = () => {
    return (
      <div className="bg-gray-100 rounded-md max-w-xs md:w-1/3 max-h-96 p-3 flex flex-wrap items-center z-20 overflow-auto mb-2 scrollbar">
        <button
          className=" bg-gray-400 rounded-sm p-1"
          onClick={() => setAddUserModal(false)}
        >
          <AiOutlineClose />
        </button>
        {userPool &&
          userPool.map((user) => (
            <button
              key={user._id}
              className="text-center rounded-md bg-secondaryShade m-1 p-1"
              onClick={() => {
                //console.log(user)
                handleRemoveUser(user.user);
                handleSelectedUser(user.user);
              }}
            >
              {user.user}
            </button>
          ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col p-5 items-center justify-center fixed inset-0">
        <div
          className="bg-zinc-200 opacity-80 fixed inset-0 z-10"
          onClick={() => {
            setCreateEventModal(false);
          }}
        ></div>
        {resultModal && (
          <Result
            setCreateEventModal={setCreateEventModal}
            setResultModal={setResultModal}
            message={result}
          />
        )}
        {addUserModal && <Modal />}
        {/* Popup of datetime selection */}
        <div className="bg-gray-100 rounded-md max-w-md p-3 flex flex-col items-center z-20">
          <h3 className="mb-3">{instruction === 'create'? <>Add Event</> : <>Edit Event</>}</h3>
          <input
            className="text-center rounded-md mb-1"
            type="datetime-local"
            min={startMin}
            onChange={(e) => {
              setMinMax(e.target.value);
              setEventStart(parseISO(e.target.value));
            }}
          ></input>
          to
          <input
            className="text-center rounded-md"
            type="datetime-local"
            min={endMinMax}
            onChange={(e) => {
              setEventEnd(parseISO(e.target.value));
            }}
          ></input>
          <div className="flex w-full justify-end items-end">
            <button
              className=" bg-accent rounded-md p-1 mt-2 text-center place-self-end"
              onClick={() => setAddUserModal(true)}
            >
              <IoPersonAddSharp />
            </button>
          </div>
          <div className="flex flex-wrap">
            {selectedUsers &&
              selectedUsers.map((user) => (
                <button
                  key={user._id}
                  className="bg-secondary text-white text-center p-1 m-1 rounded-md"
                >
                  {user}
                </button>
              ))}
          </div>
          <button
            className="bg-primary text-white rounded-md w-full mt-1"
            onClick={() => {
            
              if (instruction === "create") {
                createEvent({ eventStart, eventEnd, selectedUsers });
              } else editEvent({ eventStart, eventEnd, selectedUsers });
            }}
          >
            {instruction === 'create'? <>Create</> : <>Update</>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewEvent;
