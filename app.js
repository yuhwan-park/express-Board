const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dayjs = require("dayjs");
const session = require("express-session");
const passport = require("passport");
const MongoStore = require("connect-mongo");
const passports = require("./passport");
const indexRouter = require("./routes/index");
const postsRouter = require("./routes/posts");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const apiRouter = require("./routes/api");
const db = require("./dbConnect");
const loginRequired = require("./middlewares/login-required");

db.connect();

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.locals.formatDate = (date) => {
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "simpleBoard",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: db.uri,
    }),
  })
);
app.use(passport.initialize());
app.use(passport.session());
passports();

app.use("/", indexRouter);
app.use("/posts", loginRequired, postsRouter);
app.use("/users", loginRequired, usersRouter);
app.use("/api", loginRequired, apiRouter);
app.use("/auth", authRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;

