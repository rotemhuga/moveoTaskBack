// const express = require("express");
// const app = express();
// const http = require("http");
// const { Server } = require("socket.io");
// const cors = require("cors");

// app.use(cors());

// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
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

// server.listen(8000, () => {
//   console.log("server is running");
// });
