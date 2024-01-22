const express = require('express');
const router = express.Router();
const clientiController = require('../controllers/ClientiController');


router.get('/clienti', clientiController.index);

module.exports = router