'use strict';
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
mongoose.set('useCreateIndex', true);

exports.get = (req, res, next) => {

    Product
        .find({ active:true}, 'title price slug')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

};

exports.post = (req, res, next) => {
    var product = new Product(req.body);
    product
        .save().
        then(x => {
            res.status(201).send("sucesso");
        }).
        catch(e => {
            res.status(400).send(e);
        });
};
exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send({
        delete: true
    });
};