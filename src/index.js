import express from "express";
import chalk from "chalk";

import setupMiddleware from "./middleware";

let app = express();

setupMiddleware(app);

app.use((err, req, res, next) => {
  console.error(err.message);
  res
    .status(500)
    .send({
      error: (err && err.message) || "Something went wrong on the server"
    });
});

app.listen(process.env.PORT, err => {
  if (err) {
    console.error(err.message);
  }
  console.log(
    chalk.green(`Started the server on port ${process.env.PORT}`)
  );
});

export default app;
