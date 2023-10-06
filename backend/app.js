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

// using routes
app.use("/api/user", userRoute);
app.use("/api/post", postRoute);

module.exports = app;
