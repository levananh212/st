const express = require('express');
const config = require('./config');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./lib/auth');
const routes = require('./controllers/routes');
const products = require('./controllers/products');
const MongoStore = require('connect-mongo')(session);

const app = express();
app.listen(3000);
mongoose.Promise = require('bluebird');
mongoose.connect(config.dbConnection,{ useMongoClient : true });

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser(config.cookieParser));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(session({
    secret: config.sessionSecret, 
    resave: true, 
    saveUninitialized: true, 
    store : new MongoStore({
        url : config.dbConnection
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',passport.authenticate('facebook',{failureRedirect:'/'}),
(req,res) => res.redirect('/'));


app.get('/',routes.index);
app.get('/about',routes.about);
app.get('/contact',routes.contact);
app.get('/products',products.allProducts);
app.get('/products/:_id',products.oneProduct);
// app.post('/products',products.addProduct);
// app.delete('/products/:_id',products.delProduct);

app.all('*',(req,res) => res.redirect('/'));
app.use((err,req,res,next) => res.status(500).send(err.toString()));
