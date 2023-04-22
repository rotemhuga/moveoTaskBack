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
  const roomId: string = socket.handshake.query.roomId as string;
  console.log(roomId)
  await socket.join(roomId);
  console.log(io.sockets.adapter.rooms)

  // socket.to(roomId).emit("connected",{
  //   roomSize: io.sockets.adapter.rooms.get(roomId)?.size,
  // });

  socket.emit("roomSize", {
    roomSize: io.sockets.adapter.rooms.get(roomId)?.size,
  });

  // socket.emit("code", code);

  socket.on("code", ({ code }) => {
    // code = data;
    // socket.broadcast.emit("code", data);
    socket.to(roomId).emit("code", { code, senderId:socket.id });
  });

  socket.on("disconnect", () => {
    console.log(`user Disconnect: ${socket.id}`)
    socket.leave(roomId);
  })
});

app.get("/", function (req, res) {
   res.send("server conected");
});

server.listen(port, () => console.log(`Listening on http://localhost:${port}`));

//working
// import express from 'express';
// import http from "http";
// import { Server } from "socket.io";
// import { connectToDB } from '../src/connections';
// import routes from "../src/routes/index";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from 'dotenv';
// dotenv.config();

// const port = process.env.PORT;
// const app = express();
// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: "https://moveotaskfront.onrender.com",
//     methods: ["GET", "POST"],
//   },
// });

// let code = "";

// io.on("connection", (socket) => {
//   console.log(`user connected: ${socket.id}`);

//   socket.emit("code", code);

//   socket.on("code", (data) => {
//     code = data;
//     socket.broadcast.emit("code", data);
//   });
// });

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
// app.use(cors());

// app.use(routes);

// app.get("/", function (req, res) {
//    res.send("server conected");
// });

// connectToDB();
// server.listen(port, () => console.log(`Listening on http://localhost:${port}`));
