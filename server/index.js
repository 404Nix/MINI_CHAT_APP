import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
// import cors from "cors";

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

app.get("/one-on-one", (_req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.get("/grp-chat", (_req, res) => {
  res.status(200).json({
    message: "success",
  });
});

app.get("/broadcast", (_req, res) => {
  res.status(200).json({
    message: "success",
  });
});

io.on("connection", (socket) => {
  console.log(`User connected With ID: ${socket.id}`);

  // Broadcast
  socket.on("message", (m) => {
    console.log(m);
    socket.broadcast.emit("message", m);
  });
});
const port = 4000;
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
