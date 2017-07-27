const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name : String,
    img : String,
    desc : String
});

const Product = mongoose.model('Product',productSchema,'Product');

module.exports = Product;