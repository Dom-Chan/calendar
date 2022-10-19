import React from "react";
import { AiOutlineClose } from "react-icons/ai";

const Result = ({ message, setResultModal, setCreateEventModal }) => {
  return (
    <div>
      <div className="   bg-zinc-200 fixed inset-0 z-30  ">
        <div className="flex h-screen justify-center items-center ">
          <div className=" flex flex-col justify-center items-center bg-white py-6 px-12 border-4 rounded-md z-50">
            <button
              className=" bg-gray-400 rounded-sm p-1 self-center mb-3"
              onClick={() => {
                setResultModal(false);
                setCreateEventModal(false);
              }}
            >
              <AiOutlineClose />
            </button>

            <div className="flex text-md ">{message}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
