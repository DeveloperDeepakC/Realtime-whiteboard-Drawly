// server side
const express = require("express");
// express server
const app = express();
//  nodejs
const server = require("http").Server(app);
// nodejs => socket enabled
const path = require("path");
const io = require("socket.io")(server);
// serve static assets to client
app.use(express.static("public"));

// server
io.on("connection", function(socket) {

  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);

    // Notify others in the room
    socket.to(room).emit('message', `${username} has joined the room`);

      // Handle drawing events
    socket.on('drawing', (data) => {
      socket.to(room).emit('drawing', data);
    });
    
    socket.on("size", function(size) {
      socket.to(room).emit("onsize", size);
    });
    socket.on("color", function(color) {
      socket.to(room).emit("oncolor", color);
    });

    socket.on("toolchange", function(tool) {
      socket.to(room).emit("ontoolchange", tool);
    });
    socket.on("hamburger", function() {
      socket.to(room).emit("onhamburger");
    });
    socket.on("mousedown", function(point) {
      socket.to(room).emit("onmousedown", point);
    });
    socket.on("mousemove", function(point) {
      socket.to(room).emit("onmousemove", point);
    });
    socket.on("undo", function() {
      socket.to(room).emit("onundo");
    });
    socket.on("redo", function() {
      socket.to(room).emit("onredo");
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      console.log(`${username} disconnected`);
      socket.to(room).emit('message', `${username} has left the room`);
    });
  });
});
// nodejs server
const port = process.env.PORT || 3000;
server.listen(port, function(req, res) {
  console.log("Server has started at port 3000");
});
