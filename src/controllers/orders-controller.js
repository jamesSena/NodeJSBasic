'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/order-repository');
const guid = require('guid');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
        return;
    } catch (e) {
        res.status(500).send({ error: e });
    }
};



exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTags(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: e });
    }

};

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: e });
    }

};

exports.getBySlug = async (req, res, next) => {
    try {
        var data = repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        res.status(500).send({ error: e });
    }


};



exports.post = (req, res, next) => {
    try {

        var data = {
            customer: req.body.customer,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        };
        repository.create(data);
        res.status(200).send({
            message: 'Pedido criado com sucesso!'
        });
    } catch (e) {
        console.log('erro: ' + e);
        res.status(500).send({
            error: e
        });
    }

};
exports.put = (req, res, next) => {
    try {
        const id = req.params.id;
        repository.update(id, req.body);
        res.status(201).send({
            message: 'Produto atualizado com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }

};

exports.delete = (req, res, next) => {
    try {
        const id = req.body.id;
        Product.findOneAndRemove(id);
        res.status(201).send({
            message: 'Produto excluido com sucesso!'
        });
    } catch (e) {
        res.status(500).send({
            error: e
        });
    }


};