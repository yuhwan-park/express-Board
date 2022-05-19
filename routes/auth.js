const { Router } = require("express");
const passport = require("passport");
const { setUserToken } = require("../utils/jwt");

const router = Router();

router.post(
  "/",
  passport.authenticate("local", { session: false }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect("/");
  }
);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res, next) => {
    setUserToken(res, req.user);
    res.redirect("/");
  }
);

module.exports = router;
