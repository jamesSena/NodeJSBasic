'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/products-controller');
const authService = require('../services/auth-service');

router.get('/', controller.get);
router.post('/', authService.authorize, controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);
 
router.get('/:slug', controller.getBySlug);
router.get('/admin/:id', controller.getById);
router.get('/tags/:tag', controller.getByTag);

module.exports = router;