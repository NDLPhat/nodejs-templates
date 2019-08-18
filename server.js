var app = require("./app");
var mongoose = require("mongoose");
// var dotenv = require("dotenv");
// dotenv.config({path: "./config.env"});
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true
}).then(con => console.log("DB connection successful!!"));



// const testTour = new Tour({
//     name: "The forest Hiker",
//     rating: 4.7,
//     price: 497
// })
// testTour.save().then(doc => {
//     console.log("doc: ", doc);
// }).catch(err => console.log("error: ", err));

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listenning ${port}`);
})
