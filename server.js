// socket.io documentation chat app example

// this example requires almost no prior knowledge of node or socket
// sockets have been the solution for real-time chat systems with bidirectional communication channels
// the server can push messages to clients
// when I write a message, the idea is that the server will get it and push it to all other connected clients
// the main idea behind Socket.IO is that you can send and receive any events you want, with any data you want. Any objects that can be encoded as JSON will do; binary data is supported too

// Socket.IO is composed of two parts:
// A server that integrates with (or mounts on) the Node.JS HTTP Server socket.io
// A client library that loads on the browser side socket.io-client

const express = require("express");
const app = express();
const http = require("http");
// Express initializes app to be a function handler that you can supply to an HTTP server
const server = http.createServer(app);
// initialize a new instance of socket.io by passing the server (the HTTP server) object
const { Server } = require("socket.io");
const io = new Server(server);

// We define a route handler that gets called when we hit our website home
app.get("/", (req, res) => {
  // instead of sending html: Our code would look very confusing if we just placed our entire application’s HTML there, so instead we're going to create a index.html file and serve that instead.
  // res.send("<h1>Hello!<h1>");
  // Let’s refactor our route handler to use sendFile instead.
  res.sendFile(__dirname + "/index.html");
});

// listen on the connection event for incoming sockets and log it to the console
io.on("connection", (socket) => {
  console.log("a user connected");
  // print the chat message event the server received from the user in index.html lines 68-77
  socket.on("chat message", (msg) => {
    // console.log("message: " + msg);
    // send the message to everyone, including the sender
    io.emit("chat message", msg);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(3002, () => {
  console.log("Server running on http://localhost:3002");
});
