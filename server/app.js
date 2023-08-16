const express = require("express");
const app = express();
const cors = require("cors");
const { default: mongoose } = require("mongoose");
require("dotenv/config");

// app.use(cors({ origin: true }));

app.get("/", (req, res) => {
  return res.json("Hello, world...!");
});

// user authenticated routes
const userRoute = require("./routes/auth");
app.use("/api/users", userRoute); //if the api call is "localhost:4000/api/users" then it will go to "./routes/auth"

//to connect the mongoDB with the node js
mongoose.connect(process.env.DB_STRING);
mongoose.connection
  .once("open", () => console.log("Connected to MongoDB"))
  .on("error", (error) => console.log(`Error => ${error}`));

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
