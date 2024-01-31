const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const chat = require("./routes/chat/chat");
const players = require("./routes/players/players");
const competitions = require("./routes/competitions/competitions");
const clubs = require("./routes/clubs/clubs");
const games = require("./routes/games/games");
const stats = require("./routes/statistics/statistics");
const bodyParser = require("body-parser");
require("./drivers/mongodb");

const app = express();
const port = process.env.EXPRESS_APP_PORT || 3000;
const originURL = process.env.EXPRESS_APP_ORIGIN_URL || "http://localhost:5173";

const corsOptions = {
  origin: [originURL, "http://localhost", "http://localhost:5173"],
  methods: ["GET", "POST"],
};

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: originURL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

chat(io); // Pass the io instance to the chat module

// Use body-parser middleware to parse JSON bodies
app.use(bodyParser.json());

app.use(cors());
app.use("/api", players);
app.use("/api", competitions);
app.use("/api", clubs);
app.use("/api", games);
app.use("/api", stats);

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
