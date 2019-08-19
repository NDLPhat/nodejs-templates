var express = require("express");
var fs = require("fs");
var morgan = require("morgan");
var tourRouter = require("./routes/tourRoute");
var userRouter = require("./routes/userRoute");
const app = express();
var dotenv = require("dotenv");
var appError = require("./utils/appError");
var globalError = require("./controller/errorController");
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
app.all("*", (req, res, next) => {
    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl}`
    // })
    // const err = new Error();
    // err.statusCode = 404;
    // err.status = "fail";
    next(new appError(`Can't find ${req.originalUrl}`, 404));
    // next();
})

app.use(globalError)

// ROUTES
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

module.exports = app;