// Nicole Stewart: Great organization! 
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const videosRouter = require("./routes/videos");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/front/build")));

//Nicole Stewart: can add comments above, such as "routes"
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/videos", videosRouter);

module.exports = app;
