// mongo connection (First step)
const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes");

const express = require("express");
const backend = express();

backend.use(routes);

// CORS (Second step)
backend.use(cors({
    origin: "*",
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  })
);



mongoose.connect("mongodb+srv://amrit0207232:Cdjj2NB7bRb16Y78@beheights.facpumu.mongodb.net/")
  .then(() =>
    console.log(`${chalk.green("✓")} ${chalk.blue("MongoDB Connected!")}`)
  )
  .then(() => {
    const PORT = 3000;
    backend.listen(PORT, () => {
      console.log(
        `${chalk.green("✓")} ${chalk.blue(
          "Server Started on port"
        )} ${chalk.bgMagenta.white(PORT)}`
      );
    });
  })
  .catch((err) => console.log(err));
