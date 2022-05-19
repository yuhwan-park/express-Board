const passport = require("passport");
const local = require("./strategies/local");
const jwt = require("./strategies/jwt");

module.exports = () => {
  passport.use(local);
  passport.use(jwt);

  // ********************
  // JWT를 이용하기 위한 Session 비활성화
  // ********************
  // passport.serializeUser((user, callback) => {
  //   callback(null, user);
  // });
  // passport.deserializeUser((obj, callback) => {
  //   callback(null, obj);
  // });
};
