'use strict';
const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

const Product = mongoose.model('Product');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


exports.getByTag = (req, res, next) => {
    repository.getByTags(req.params.tag)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

};

exports.getById = (req, res, next) => {
    repository.getById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

};

exports.getBySlug = (req, res, next) => {

    repository.getBySlug(req.params.slug)
    .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

};



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

    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo tem que ter 3 caracter');
    contract.hasMinLen(req.body.description, 3, 'O description tem que ter 3 caracter');

    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }

    repository.create(req.body)
        .then(x => {
            res.status(201).send("sucesso");
        }).
        catch(e => {
            res.status(400).send(e);
        });
};
exports.put = (req, res, next) => {
    const id = req.params.id;
    repository.update(id, req.body)
        .then(x => {
            res.status(201).send({
                message: 'Produto atualizado com sucesso!'
            });
        }).catch(e => {
            res.status(400).send({
                message: 'Erro na atualização',
                data: e
            });
        });
};

exports.delete = (req, res, next) => {
    const id = req.body.id;
    Product.findOneAndRemove(id)
   .then(x => {
        res.status(201).send({
            message: 'Produto excluido com sucesso!'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Erro nao excluir',
            data: e

        });
    });

};