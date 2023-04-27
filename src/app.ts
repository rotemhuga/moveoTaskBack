import express from 'express';
import http from "http";
import { Server } from "socket.io";
import { connectToDB } from '../src/connections';
import routes from "../src/routes/index";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);
connectToDB();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", async (socket) => {
  console.log(`user connected: ${socket.id}`);
  const roomCodeId: string = socket.handshake.query.roomCodeId as string;
  await socket.join(roomCodeId);

  socket.emit("roomSize", {
    roomSize: io.sockets.adapter.rooms.get(roomCodeId)?.size,
  });
  console.log("roomSize:", io.sockets.adapter.rooms.get(roomCodeId)?.size);


  socket.on("code", ({ code }) => {
    socket.to(roomCodeId).emit("code", { code, senderId:socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`user disconnect: ${socket.id}`)
    socket.leave(roomCodeId);
  })
});

app.get("/", function (req, res) {
   res.send("server conected");
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
