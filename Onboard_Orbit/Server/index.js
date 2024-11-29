const express = require("express");
const { mongoose } = require("mongoose");
const app = express();
const cors = require("cors");
const adminRoute = require("./routes/adminRoute");
// const auth = require('./routes/auth')
const cookieParser = require('cookie-parser')
const fs = require('fs');
const path = require('path');

app.use(
  cors({ 
    origin: "http://localhost:8082",
    credentials:true
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", adminRoute);
// app.use("/", auth)
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

mongoose.connect("mongodb://localhost:27017/OnboardOrbit");

const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});