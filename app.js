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

// Initialize Express app
const app = express();
const port = process.env.EXPRESS_APP_PORT || 3000;
const originURL = process.env.EXPRESS_APP_ORIGIN_URL || "http://localhost:5173";

// Configure CORS options
const corsOptions = {
  origin: [originURL, "http://localhost", "http://localhost:5173"],
  methods: ["GET", "POST"],
};

// Create HTTP server and Socket.io instance
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: originURL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Initialize chat module with Socket.io
chat(io);

// Use body-parser middleware to parse JSON request bodies
app.use(bodyParser.json());

// Enable CORS with the specified options
app.use(cors(corsOptions));

// Setup routes for different parts of the application
app.use("/api", players);
app.use("/api", competitions);
app.use("/api", clubs);
app.use("/api", games);
app.use("/api", stats);

// Start the server
server.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
