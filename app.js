const express = require('express');
const mongoskin = require('mongoskin');
const db = mongoskin.db('mongodb://localhost:27017/st',{native_parser:true}); 
const bodyParser = require('body-parser');
const routes = require('./routes/routes');
const products = require('./routes/products');

const app = express();
const port = process.env.PORT || 3000;
app.listen(port);

app.set('view engine','ejs');
app.set('views','views');
app.use(express.static('public'));
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
