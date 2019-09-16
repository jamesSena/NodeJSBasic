'use strict';
const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/customer-repository');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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

exports.authenticate = async (req, res, next) => {
    try {
        const customer = await repository.autheticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });

        if (customer.length <= 0)
        {
            res.status(400).send({
                message: "usuario ou senha invalida"             
            });
            return;
        }
        const token = await authService.generateToken(
            {
                email: customer.email,
                name: customer.name,
                id: customer.id
            }
        );

        res.status(200).send({
            token: token,
            data: {
                email: req.body.email,
                name: req.body.name
            }
        });
    } catch (e) {
        console.log('erro: ' + e);
        res.status(500).send({
            error: e
        });
    }

};

exports.post = async (req, res, next) => {
    try {
        let contract = new ValidationContract();
        contract.hasMinLen(req.body.name, 3, 'O name tem que ter 3 caracter');
        contract.isEmail(req.body.email, 'Email inválido');
        contract.hasMinLen(req.body.password, 6, 'O password tem que ter 6 caracter');

        if (!contract.isValid()) {
            res.status(400).send(contract.errors()).end();
            return;
        }

     

        emailService.send(req.body.email, 'Bem vindo ao node.js', global.EMAIL_TMPL.replace('{0}', req.body.name));

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        res.status(200).send({
            message: 'Cliente criado com sucesso!'
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