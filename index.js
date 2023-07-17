const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res)=>{
res.send("<h1>Welcome</h1>")
})

const connection = async () => {
  try {
    await mongoose.connect(process.env.mongo_url);
  } catch (error) {
    console.log(error);
  }
};


app.listen(process.env.port, () => {
  connection();
  console.log("Listening at 8080!");
});
