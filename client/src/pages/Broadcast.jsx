import React from "react";
import { useMemo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { io } from "socket.io-client";

const Broadcast = () => {
  const [message, setMessage] = useState("");
  const [list, setList] = useState([]);
  const socket = useMemo(() => io("http://localhost:4000", {
    withCredentials: true,
  }), [])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(message);
    socket.emit("message", message);
    setMessage("");
  };


  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected!");
    });
    socket.on("message", (m) => {
      setList(prev => [...prev, m]);
    })
  }, []);

  return (
    <>
      <div className="text-3xl h-screen w-full flex flex-col justify-center items-center">
        <h1>Broadcast</h1>
        <div>
          {list.length !== 0 && (
            list.map((msg, i) => <li key={i}>{msg}</li>)
          )}
        </div>
        <div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border-1 focus:outline-none mt-70 px-4 py-4"
              placeholder="message"
            />
            {/* <input type="text" className="border-1 focus:outline-none ml-10 px-4 py-4" placeholder="ID"/> */}

            <button
              type="submit"
              className="text-white bg-black box-border border border-transparent hover:bg-dark-strong focus:ring-4 focus:ring-neutral-tertiary shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Broadcast;
