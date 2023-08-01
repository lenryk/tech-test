require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const promMid = require("express-prometheus-middleware");
const authorization = require("./middleware/authorization");
const cors = require("cors");

const timeRouter = require("./routes/time");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(
  "*",
  cors({
    credentials: true,
    preflightContinue: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  }),
);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(authorization);

app.use("/time", timeRouter);
app.use(
  promMid({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    collectGCMetrics: true,
    metricsApp: app,
  }),
);

// catch 404 and forward to error handler
app.use(function (req, res) {
  res.render("404");
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
