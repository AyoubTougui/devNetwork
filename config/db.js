const mongoos = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");

const connectDB = async () => {
  try {
    await mongoos.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("mongo connected");
  } catch (err) {
    console.error(err.message);
    //exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;