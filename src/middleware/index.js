import bodyParser from "body-parser";
import mongoose from "mongoose";
import morgan from "morgan";

import config from "../config";
import apiRoutes from "../api/routes";

export default (app, cb) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(
    config.mongoURL,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true
    },
    error => {
      if (error) {
        console.error("Please make sure Mongodb is installed and running!"); // eslint-disable-line no-console
        throw error;
      }
      console.log("Connected to MongoDB"); // eslint-disable-line

      if (typeof cb === "function") {
        cb();
      }
    }
  );

  //   app.use(cors({
  // 	exposedHeaders: config.corsHeaders
  //   }));
	app.use(morgan("dev"));
  app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
};
