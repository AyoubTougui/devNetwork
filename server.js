const express = require("express");
const app = express();
const connectDB = require("./config/db");
const http = require("http");
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
const User = require("./models/User");

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
app.use("/api/notifications", require("./routes/api/notifications"));

io.on("connection", (socket) => {
  socket.on("post_like", async (data) => {
    socket.broadcast.emit("likeNotif", data);
  });
  socket.on("post_comment", async (data) => {
    socket.broadcast.emit("commentNotif", data);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server started on port " + PORT));
