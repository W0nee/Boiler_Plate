const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const User = require("./models/User");
const config = require("./config/key");

const mongoose = require("mongoose");
mongoose.connect(config.mongoURI, {
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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World"));

app.post("/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.listen(port, () => console.log("http://localhost:" + port));
