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

var users = [];

io.on("connection", (socket) => {
  socket.on("save_user", (data) => {
    users[data.id] = data.socket_id;
    console.log(users);
  });
  socket.on("post_like", (data) => {
    if (data.from !== data.to) {
      console.log(data);
      socket.broadcast.emit("likeNotif", data);
      console.log(users);
      // socket.to("yoj1PT9R6Ywp6bpDAAAM").emit("likeNotif", data);
    }
  });
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log("Server started on port " + PORT));
