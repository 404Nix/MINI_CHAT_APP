import React, { useMemo, useEffect, useState } from "react";
import { io } from "socket.io-client";

const GroupChat = () => {
    const [message, setMessage] = useState("");
    const [room, setRoom] = useState("");
    const [list, setList] = useState([]);

    const socket = useMemo(
        () => io("http://localhost:4000", { withCredentials: true }),
        [],
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        socket.emit("group-msg", {message, room});
        setMessage("");
    };

    const handleJoinRoom = () => {
        socket.emit("join-room", room);
    }

    useEffect(() => {
        socket.on("connect", () => {
            console.log("connected!", socket.id);
        });

        socket.on("group-message", (msg) => {
            setList((prev) => [...prev, String(msg)]);
        });
    }, []);

    return (
        <div className="text-3xl h-screen w-full flex flex-col justify-center items-center">
            <h1>Group-Chat</h1>

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
                    className="border focus:outline-none mt-70 px-4 py-4"
                    placeholder="message"
                />
                <button
                    type="submit"
                    className="text-white bg-black border border-transparent font-medium rounded text-sm px-4 py-2.5"
                >
                    Send
                </button>
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="border focus:outline-none ml-10 px-4 py-4"
                    placeholder="room name"
                />
                <button
                    onClick={handleJoinRoom}
                    type="button"
                    className="text-white bg-black border border-transparent font-medium rounded text-sm px-4 py-2.5"
                >
                    join
                </button>
            </form>
        </div>
    );
};

export default GroupChat;
