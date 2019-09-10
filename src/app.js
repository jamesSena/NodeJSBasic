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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const indexRoute = require('./routes/index-route'); //carrega as Rotas
const productsRoute = require('./routes/products-route'); //carrega as Rotas
const customersRoute = require('./routes/customer-route'); //carrega as Rotas
const ordersRoute = require('./routes/orders-route'); //carrega as Rotas




app.use('/', indexRoute);
app.use('/products', productsRoute);
app.use('/customers', customersRoute);
app.use('/orders', ordersRoute);

module.exports = app;