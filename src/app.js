'use strict';

const express = require('express');
const bodyParser = require('body-parser'); 

const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


const indexRoute = require('./routes/index-route'); //carrega as Rotas
const productsRoute = require('./routes/products-route'); //carrega as Rotas




app.use('/', indexRoute);
app.use('/products', productsRoute);

module.exports = app;