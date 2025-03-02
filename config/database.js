const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL , {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then( () => console.log("DB connected sucessfully"))
    .catch( () => {
        console.log("db CONNECTION FAILED");
        console.log(Error);
        process.exit(1);
    })
};