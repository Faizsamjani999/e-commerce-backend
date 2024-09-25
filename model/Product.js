const mongoose = require("mongoose");

const schema = mongoose.Schema({
    pname : {
        type : String,
        required : true
    },
    brandname : {
        type : String,
        require : true
    },
    des : {
        type : String,
        require : true
    },
    price : {
        type : Number,
        require : true
    },
    img : {
        type : String,
        require : true
    }
})

const Product = mongoose.model("Product",schema);

module.exports = Product;