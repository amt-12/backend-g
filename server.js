// mongo connection (First step)
const mongoose = require("mongoose");
const chalk = require("chalk");
const routes = require("./routes");
const cors = require("cors");
const express = require("express");
const backend = express();
const multer = require("multer");
const path = require('path');

backend.use(express.json());
backend.use(express.urlencoded({ extended: true }));


// CORS (Second step) 2
backend.use(cors({
  origin: "*",
  methods: ["GET", "PUT", "PATCH", "POST", "DELETE"],
})
);


// routing 3 this is the routes which will be  come from frontend
backend.use(routes);
backend.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// mongoose connect 1
mongoose.connect("mongodb+srv://arshsandal50:b4f4SeltbzMaRsB2@backend.zgxsu.mongodb.net/")
.then(() =>
    console.log("Mongo Connected")
  )
  .then(() => {
    const PORT = 5001;
    backend.listen(PORT, () => {
      console.log("Server started on port", (PORT));
    });
  })
  .catch((err) => console.log(err));
