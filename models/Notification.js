const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
  user_from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  user_to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  message: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Notification = mongoose.model("notification", NotificationSchema);
