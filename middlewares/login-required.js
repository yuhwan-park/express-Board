module.exports = (req, res, next) => {
  if (!req.user) {
    res.redirect("/");
    return;
  }
  if (req.user.passwordReset) {
    res.redirect("/change-password");
    return;
  }
  next();
};
