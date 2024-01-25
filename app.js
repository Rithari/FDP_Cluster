const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const chat = require("./routes/chat/chat");
const players = require("./routes/players/players");
const competitions = require("./routes/competitions/competitions");
const clubs = require("./routes/clubs/clubs");
const games = require("./routes/games/games");
require("./drivers/mongodb");

const app = express();
const port = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
};

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chat(io); // Pass the io instance to the chat module

app.use(cors(corsOptions));
app.use("/api", players);
app.use("/api", competitions);
app.use("/api", clubs);
app.use("/api", games);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
