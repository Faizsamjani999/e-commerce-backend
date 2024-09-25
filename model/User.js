const mongoose = require("mongoose");

const schema = mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
    isAdmin : {
        type : Boolean,
        default : false
    }
},{timestamps:true});

const User = mongoose.model("User",schema);

module.exports = User;