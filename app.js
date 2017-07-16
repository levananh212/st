const express = require('express');
const mongoskin = require('mongoskin');
const db = mongoskin.db('mongodb://admin:12341qaz@ds161162.mlab.com:61162/heroku_z1ggs2d3'); 
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const passport = require('passport');
const routes = require('./controllers/routes');
const products = require('./controllers/products');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(expressSession({secret: 'DH374DH87E2H17DH312', resave: true, saveUninitialized: true}));

app.use((req,res,next) => {
    req.db = {};
    req.db.products = db.collection('products');
    next();
});

app.get('/',routes.index);
app.get('/about',routes.about);
app.get('/contact',routes.contact);
app.get('/products',products.allProducts);
app.get('/products/:_id',products.oneProduct);
app.post('/products',products.addProduct);
app.delete('/products/:_id',products.delProduct);

app.all('*',(req,res) => res.redirect('/'));
app.use((err,req,res,next) => res.status(500).send(err.toString()));
