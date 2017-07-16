exports.allProducts = (req,res,next) => {
    req.db.products.find().toArray((err,products) => {
        if (err) return next(err);
        res.render('products', {title : 'Products' , products });
    });
}

exports.oneProduct = (req,res,next) => {
    req.db.products.findById(req.params._id,(err,product) => {
        if (err) return next(err);
        res.render('product', {title : 'Product' , product });
    });
}

exports.addProduct = (req,res,next) => {
    if (!req.body || !req.body.name || !req.body.img) return next(new Error('No data provide'));
    req.db.products.save({
        name : req.body.name,
        img : req.body.img,
        desc : req.body.desc
    }, (err,product) => {
        if (err) return next(err);
        if (!product) return next(new Error('Fail to add!'));
        res.redirect('/');
    });
}

exports.delProduct = (req,res,next) => {
    req.db.products.removeById(req.params._id, (err,pcount) => {
        if (err) return next(err);
        if (count !== 1) return next(new Error('Fail to delete!'));
        res.redirect('/');
    });
}