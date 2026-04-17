import React, { useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";

const OneonOne = () => {
    const [message, setMessage] = useState("");
    const [socketID, setSocketID] = useState("");
    const [list, setList] = useState([]);

    const socket = useMemo(
        () => io("http://localhost:4000", { withCredentials: true }),
        []
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("message", { message, socketID });
        setMessage("");
    };

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected!", socket.id);
        });

        socket.on("Onemessage", (msg) => {
            setList((prev) => [...prev, String(msg)]);
        });

    }, []);

    return (
        <div className="text-3xl h-screen w-full flex flex-col justify-center items-center">
            <h1>One-on-One</h1>

            <ul>
                {list.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border-1 focus:outline-none mt-70 px-4 py-4"
                    placeholder="message"
                />
                <input
                    type="text"
                    value={socketID}
                    onChange={(e) => setSocketID(e.target.value)}
                    className="border-1 focus:outline-none ml-10 px-4 py-4"
                    placeholder="ID"
                />
                <button
                    type="submit"
                    className="text-white bg-black border border-transparent font-medium rounded text-sm px-4 py-2.5"
                >
                    Send
                </button>
            </form>
        </div>
    );
};

export default OneonOne;