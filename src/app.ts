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
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://moveotaskfront.onrender.com",
    methods: ["GET", "POST"],
  },
});

let code = "";

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);

  socket.emit("code", code);

// socket.on("join_room", (data) => {
//    socket.join(data);
//  });

  socket.on("code", (data) => {
    code = data;
    socket.broadcast.emit("code", data);
    // socket.to(data.room).emit("code", data);
  });
});

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use(routes);

app.get("/", function (req, res) {
   res.send("server conected");
});

connectToDB();
server.listen(port, () => console.log(`Listening on http://localhost:${port}`));


// import express from 'express';
// import { connectToDB } from '../src/connections';
// import routes from "../src/routes/index";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from 'dotenv';
// dotenv.config();
// const port = process.env.PORT
// const app = express();

// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
// app.use(cors());

// app.use(routes);

// app.get("/", function (req, res) {
//    res.send("Hello World");
// });

// connectToDB();
// app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
