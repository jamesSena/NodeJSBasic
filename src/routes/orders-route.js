'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/orders-controller');
const authSerivce = require('../services/auth-service');

router.get('/', authSerivce, controller.get);
router.post('/', authSerivce, controller.post);

router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;