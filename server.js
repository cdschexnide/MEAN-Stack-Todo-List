// set up
const express = require("express");
const mongoose = require("mongoose"); // ODM library for mongoDB
const morgan = require("morgan"); // log requests to the console
const methodOverride = require("method-override"); // simulate PUT and DELETE
const database = require("./config/database");
const taskRouter = require("./app/taskRouter");

const PORT = process.env.PORT || 3000; // set the port
const app = express(); // create app w/ express

// configuration
mongoose.connect(database.url); // connect to mongoDB database

// functions to be executed on every request to Node.js
app.use(express.static(__dirname, +"/public")); // serve static content
app.use(morgan("dev")); // log every request to the console
app.use(express.json()); // parse incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); // parse incoming requests with urlencoded payloads
app.use(methodOverride());
app.use("/tasks", taskRouter);

// start app with node server.js
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
