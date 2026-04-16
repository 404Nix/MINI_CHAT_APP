import express from "express";
import { createServer, get, METHODS } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
        credentials: true
    }
})

app.get("/one-on-one", (_req, res) => {
  res.status(201).json({
    message: "success",
  });
});

app.get("/grp-chat", (_req, res) => {
  res.status(201).json({
    message: "success",
  });
});

app.get("/broadcast", (_req, res) => {
  res.status(201).json({
    message: "success",
  });
});

app.listen(3000, () => {
  console.log(`Listening on port 3000`);
});
