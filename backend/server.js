//1 including the require
const express = require("express");
const Router = express.Router();
const cors = require("cors");

const mongoose = require("mongoose");
// 2 configure ing dot env files
require("dotenv").config();
// 3
const app = express();
const port = process.env.PORT || 5000;
// 5 middle ware
app.use(cors());
// for parsing json
app.use(express.json());

// setting up mongoose uri to coonect
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
// establishing mongoose connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb database connection establised sucessfully");
});

const exercisesRouter = require("./routes/exercises");
const usersRouter = require("./routes/users");

app.use("/exercises", exercisesRouter);
app.use("/users", usersRouter);
// app.get("/users", displayUsers)
// app.get("/exercise", displayExercises)
// app.post("/add-exercise", addExercises)
// app.post("/", addUser)

// 5 staring the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
