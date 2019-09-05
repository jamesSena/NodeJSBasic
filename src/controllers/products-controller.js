'use strict';
const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

const Product = mongoose.model('Product');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);




exports.get = async (req, res, next) => {

    var data = await repository.get();
    res.status(200).send(data);

};



exports.getByTag = async (req, res, next) => {
    var data = await repository.getByTags(req.params.tag);
    res.status(200).send(data);

};

exports.getById = async (req, res, next) => {
    var data = await repository.getById(req.params.id);
    res.status(200).send(data);

};

exports.getBySlug = async (req, res, next) => {

    var data = repository.getBySlug(req.params.slug);
    res.status(200).send(data);

};



exports.post = (req, res, next) => {

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo tem que ter 3 caracter');
    contract.hasMinLen(req.body.description, 3, 'O description tem que ter 3 caracter');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body);
    res.status(200).send({
        message: 'Produto atualizado com sucesso!'
    });
};
exports.put = (req, res, next) => {
    const id = req.params.id;
    repository.update(id, req.body);
    res.status(201).send({
        message: 'Produto atualizado com sucesso!'
    });
};

exports.delete = (req, res, next) => {
    const id = req.body.id;
    Product.findOneAndRemove(id);
    res.status(201).send({
        message: 'Produto excluido com sucesso!'
    });

};