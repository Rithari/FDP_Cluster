const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const chat = require("./routes/chat/chat");
const players = require("./routes/players/players");
const competitions = require("./routes/competitions/competitions");
const clubs = require("./routes/clubs/clubs");

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
const io = socketIo(server);

chat(io); // Pass the io instance to the chat module

app.use(cors());
app.use("/api", players);
app.use("/api", competitions);
app.use("/api", clubs);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
