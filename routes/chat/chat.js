module.exports = function (io) {
  // Array to keep track of connected users
  let users = [];

  // Event listener for new socket connections
  io.on("connection", (socket) => {
    // Listen for 'message' events from clients
    socket.on("message", (data) => {
      // Emit received message to all connected clients
      io.emit("messageResponse", data);
    });

    // Listen for 'typing' events from clients
    socket.on("typing", (data) =>
      // Broadcast 'typing' status to all other connected clients
      socket.broadcast.emit("typingResponse", data)
    );

    // Listen for 'newUser' events when a client connects
    socket.on("newUser", (data) => {
      // Assign a default username if not provided
      if (!data.username) {
        data.username = `Anonymous${Math.floor(Math.random() * 1000)}`;
      }

      // Include the socket ID for the connected user
      data.socketID = socket.id;
      users.push(data);

      // Emit the updated users list to all connected clients
      io.emit("newUserResponse", users);
    });

    // Listen for disconnect event when a client disconnects
    socket.on("disconnect", () => {
      // Remove the disconnected user from the users array
      users = users.filter((user) => user.socketID !== socket.id);

      // Emit the updated users list to all connected clients
      io.emit("newUserResponse", users);

      // Ensure the socket is properly disconnected
      socket.disconnect();
    });
  });
};
