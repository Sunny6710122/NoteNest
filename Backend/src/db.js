const mongoose = require("mongoose");

const MongoConnect = ()=>{
    mongoose.connect("mongodb://localhost:27017");
    console.log("Connected");
    
}

module.exports =  MongoConnect;