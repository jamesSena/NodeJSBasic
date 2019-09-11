'use strict';
const express = require('express');
const router = express.Router();
const controller = require('../controllers/customers-controller');

router.get('/', controller.get);
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);
router.post('/authenticate', controller.authenticate);

module.exports = router;