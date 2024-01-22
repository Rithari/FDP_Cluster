module.exports = function (io) {
  let users = [];

  io.on("connection", (socket) => {
    socket.on("message", (data) => {
      io.emit("messageResponse", data);
    });

    socket.on("typing", (data) =>
      socket.broadcast.emit("typingResponse", data)
    );

    socket.on("newUser", (data) => {
      // Check if the username is provided, otherwise assign an anonymous name
      if (!data.username) {
        data.username = `Anonymous${Math.floor(Math.random() * 1000)}`;
      }

      // Include the socket ID in the user's data
      data.socketID = socket.id;
      users.push(data);

      io.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
      users = users.filter((user) => user.socketID !== socket.id);
      io.emit("newUserResponse", users);
      socket.disconnect();
    });
  });
};
