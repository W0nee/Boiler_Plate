const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const config = require("./config/key");
const User = require("./models/User");
const auth = require("./middleware/auth");

// sms 인증
const request = require("request");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const SHA256 = require("crypto-js/sha256");
const Base64 = require("crypto-js/enc-base64");

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
app.use(cookieParser());

// app.get("/", (req, res) => res.send("Hello World"));

app.get("/test/hello", (req, res) => res.send("Hello World"));

app.post("/users/register/smsauth", (req, res) => {
  const phone = req.body.receiver;
  const accessKey = "7WP2JCYitFTIyxqA5fRu";
  const secretKey = "bxaNbCDVkeUHMeNuvaViqQVNg4ebUY3vYdN9HDUl";
  const serviceID = "ncp:sms:kr:260821024069:authentication";
  const myphone = "01041028844";
  const randomNum = Math.floor(Math.random() * 1000000);
  var resultCode = 0;

  // 시그니처 생성
  const space = " ";
  const newLine = "\n";
  const method = "POST";
  const url = `https://sens.apigw.ntruss.com/sms/v2/services/${serviceID}/messages`;
  const urlsub = `/sms/v2/services/${serviceID}/messages`;
  const timestamp = Date.now().toString();

  const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, secretKey);
  hmac.update(method);
  hmac.update(space);
  hmac.update(urlsub);
  hmac.update(newLine);
  hmac.update(timestamp);
  hmac.update(newLine);
  hmac.update(accessKey);
  const hash = hmac.finalize();
  const signature = hash.toString(CryptoJS.enc.Base64);

  request(
    {
      method: method,
      json: true,
      uri: url,
      headers: {
        "Contenc-type": "application/json; charset=utf-8",
        "x-ncp-iam-access-key": accessKey,
        "x-ncp-apigw-timestamp": timestamp,
        "x-ncp-apigw-signature-v2": signature,
      },
      body: {
        type: "SMS",
        contentType: "COMM",
        countryCode: "82",
        from: myphone,
        content: `인증번호는 [${randomNum}] 입니다.`,
        messages: [
          {
            to: `${phone}`,
          },
        ],
      },
    },
    function (err, res, html) {
      // if (err) {
      //   resultCode = 400;
      //   console.log("1");
      //   console.log(resultCode);
      //   return console.log(err);
      // } else {
      // resultCode = 200;
      // console.log("2");
      // console.log(resultCode);
      // console.log(html);
      // }

      if (err) console.log(err);
      console.log(html);
    }
  );

  // await console.log("3");
  // await res.json({
  res.json({
    receiverSuccess: true,
    checkAuthNum: randomNum,
  });

  // console.log(resultCode);
});

app.post("/users/register", (req, res) => {
  const user = new User(req.body);
  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      registerSuccess: true,
    });
  });
});

app.post("/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "이메일이 틀림",
      });
    }

    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch) {
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀림",
        });
      }

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);

        // 토큰 저장 (로컬, 세션, 쿠키) -> 쿠키 (x_auth 라는 이름으로)
        res.cookie("x_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

// app.get("/users/auth", auth, (req, res) => {
//   res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     role: req.user.role,
//     image: req.user.image,
//   });
// });

app.get("/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.listen(port, () => console.log(`http://localhost:${port}`));
