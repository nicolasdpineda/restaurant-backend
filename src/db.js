const mongoose = require("mongoose");
const config = require("./config");

export default callback => {
  // connect to a database if needed, then pass it to `callback`:
  mongoose.Promise = global.Promise;
  mongoose.connect(config.mongoURL, error => {
    if (error) {
      console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
      throw error;
    }
    console.log("Connected to MongoDB"); // eslint-disable-line

    if (typeof callback === "function") {
      callback();
    }
  });
};
