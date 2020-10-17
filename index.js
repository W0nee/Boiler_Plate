const express = require("express");
const app = express();
const port = 3000;

const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://park:park123@cluster0.4bvqg.mongodb.net/boiler-plate?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});
var db = mongoose.connection;
db.once("open", function () {
  console.log("DB Connected");
});
db.on("error", function (err) {
  console.log("DB Error : ", err);
});

app.get("/", (req, res) => res.send("Hello World"));

app.listen(port, () => console.log("http://localhost:3000"));
