const express = require("express");
const app = express();
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const cors = require("cors");

app.use(cors());

// connect database
connectDB();

// Init Middlware
app.use(express.json({ extended: false }));

// app.get("/", (req, res) => res.send("api running"));

// define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));

io.on("connection", (socket) => {
  console.log("A user connected");
  socket.emit("test");
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server started on port " + PORT));
