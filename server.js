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

io.on("connection", (socket) => {
  socket.on("save_user", async (data) => {
    let user = await User.findById(data.id);
    user.Socket_id = data.socket_id;
    await user.save();
    console.log(user);
  });
  socket.on("post_like", async (data) => {
    console.log(data);
    let userFrom = await User.findById(data.from);
    data.message = `${userFrom.name} Liked your post`;
    socket.broadcast.emit("likeNotif", data);
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server started on port " + PORT));
