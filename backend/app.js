const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

// Using Middlewares

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// importing routes
const userRoute = require("./routes/userRoute");
const postRoute = require("./routes/postRoute");
const followRoute = require("./routes/followRoute");
const searchRoute = require("./routes/searchRoute");

// using routes
app.use("/api/user", userRoute);
app.use("/api/user", postRoute);
app.use("/api/user", followRoute);
app.use("/api/user", searchRoute);

module.exports = app;
