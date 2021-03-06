const mongoose = require('mongoose');
const User = require('../models/user');
const Product = require('../models/product');

exports.allProducts = (req,res,next) => {
    Product.find({}, (err,products) => {
        if (err) return next(err);
        if (!products) return res.redirect('/');
        res.render('products', {title : 'Products' , products,user : req.user });
    });
}

exports.oneProduct = (req,res,next) => {
    Product.findOne({_id : req.params._id},(err,product) => {
        if (err) return next(err);
        if (!product) return res.redirect('/');
        res.render('product', {title : 'Product' , product,user : req.user });
    });
}

// exports.addProduct = (req,res,next) => {
//     if (!req.body || !req.body.name || !req.body.img) return next(new Error('No data provide'));
//     req.db.products.save({
//         name : req.body.name,
//         img : req.body.img,
//         desc : req.body.desc
//     }, (err,product) => {
//         if (err) return next(err);
//         if (!product) return next(new Error('Fail to add!'));
//         res.redirect('/');
//     });
// }

// exports.delProduct = (req,res,next) => {
//     req.db.products.removeById(req.params._id, (err,pcount) => {
//         if (err) return next(err);
//         if (count !== 1) return next(new Error('Fail to delete!'));
//         res.redirect('/');
//     });
// }