'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');





exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
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
        res.status(500).send({error:e});
    }


};



exports.post = (req, res, next) => {
    try {
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
    } catch (e) {
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
        });}

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