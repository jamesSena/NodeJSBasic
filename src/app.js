'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');
const md5 = require('md5');



const app = express();
//Conectando no banco de dados
mongoose.connect(config.connectionString, { useNewUrlParser: true });

const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Accept,x-access-token');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
const indexRoute = require('./routes/index-route'); //carrega as Rotas
const productsRoute = require('./routes/products-route'); //carrega as Rotas
const customersRoute = require('./routes/customer-route'); //carrega as Rotas
const ordersRoute = require('./routes/orders-route'); //carrega as Rotas




app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customersRoute);
app.use('/orders', ordersRoute);

module.exports = app;