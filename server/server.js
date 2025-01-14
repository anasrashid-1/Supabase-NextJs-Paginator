const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });
  
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });

  socket.on("newProduct", (notification) => {
        // console.log(`Sender Socket ID: ${socket.id}`);
        // it will not emit notification for sender
        socket.broadcast.emit("newNotification", notification); 
  });
});

server.listen(4000, () => {
  console.log("Server is running on port 4000");
});
