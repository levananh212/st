exports.index = (req,res) => res.render('index', {title : 'Home',user : req.user});

exports.about = (req,res) => res.render('about', {title : 'About',user : req.user });

exports.contact = (req,res) => res.render('contact', {title : 'Contact',user : req.user });