'use strict';
const mongoose = require('mongoose');
const ValidationContract = require('../validators/fluent-validator');

const Product = mongoose.model('Product');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);


exports.getByTag = (req, res, next) => {

    Product
        .find({ tags: req.params.tag, active: true }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

};

exports.getById = (req, res, next) => {

    Product
        .findById(req.params.id)
        .then(data => {
            res.status(200).send(data);
        })
        .catch(e => {
            res.status(400).send(e);
        });

};

exports.getBySlug = (req, res, next) => {

    Product
        .find({ slug: req.params.slug, active: true }, 'title description price slug tags')
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
    Product.findByIdAndUpdate(id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(x => {
        res.status(201).send({
           message:'Produto atualizado com sucesso!'
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