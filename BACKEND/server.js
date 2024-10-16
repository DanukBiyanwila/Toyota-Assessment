const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL);

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Connection Success");
});

const UserRouter = require("./routes/User");
app.use("/User", UserRouter);



app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});
