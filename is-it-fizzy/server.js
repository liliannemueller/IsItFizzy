const express = require('express'); 
const mongoose = require("mongoose");
const dotenv = require("dotenv"); // Import dotenv

dotenv.config();
const bodyParser = require("body-parser"); // You may need to install this

const app = express(); 
app.use(bodyParser.json());
const port = process.env.PORT || 5000; 
const uriPW = process.env.REACT_APP_DB_PW;
const username = process.env.REACT_APP_DB_USERNAME;
// MongoDB 
const dbURI = `mongodb+srv://${username}:${uriPW}@fizzy.ol6cspb.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB database");
});






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
