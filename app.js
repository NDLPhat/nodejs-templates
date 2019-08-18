var express = require("express");
var fs = require("fs");
var morgan = require("morgan");
var tourRouter = require("./routes/tourRoute");
var userRouter = require("./routes/userRoute");
const app = express();
var dotenv = require("dotenv");
dotenv.config({path: "./config.env"});


// MIDDLEWARES
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
}
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
})

// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;