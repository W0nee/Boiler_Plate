const User = require("../models/User");

let auth = (req, res, next) => {
  // 인증처리
  // 클라이언트 쿠키에서 토큰을 가져오기
  let token = req.cookies.x_auth;
  console.log(token);

  // 토큰 복호화한 후 유저 찾기
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, error: true });

    // middleware에서 req를 사용함으로써, next() 이후의 함수에서 req를 통해 접근 가능
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = auth;
