const express = require('express');
const mongoskin = require('mongoskin');
const db = mongoskin.db('mongodb://heroku_z1ggs2d3@ds161162.mlab.com:61162/heroku_z1ggs2d3',{native_parser:true}); 
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');
const routes = require('./routes/routes');
const products = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);

app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.use(express.static('public'));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
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

app.all('*',(req,res) => res.status(404).send());
app.use((err,req,res,next) => res.status(500).send(err.toString()));
