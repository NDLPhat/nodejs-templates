var mongoose = require("mongoose");
var fs = require("fs");
var dotenv = require("dotenv");
dotenv.config({path: "./config.env"});
var Tour = require("../../models/tourModels");
// var dotenv = require("dotenv");
// dotenv.config({path: "./config.env"});
mongoose.connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => console.log("DB connection successful!!"));

const importData = async () => {
    try{
        var db = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));
        await Tour.create(db);
        console.log("DB successfully loaded")
    }
    catch(err){
        console.log("DB fail loaded: ", err);
    }
}

const deleteData = async () => {
    try{
        await Tour.deleteMany();
        console.log("DB successfully deleted");
        process.exit();
    }catch(err){
        console.log("DB fail deleted: ", err);
    }
}

if (process.argv[2] === "--import"){
    importData();
} else if (process.argv[2] === "--delete"){
    deleteData();
}