exports.index = (req,res) => {
    console.log(req.user);
    res.render('index', {title : 'Home'});
}

exports.about = (req,res) => res.render('about', {title : 'About' });

exports.contact = (req,res) => res.render('contact', {title : 'Contact' });