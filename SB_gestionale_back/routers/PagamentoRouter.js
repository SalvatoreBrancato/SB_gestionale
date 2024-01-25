const express = require('express');
const router = express.Router();
const pagamentoController = require('../controllers/pagamentoController');

router.get('/', pagamentoController.index);
router.post('/inserisci', pagamentoController.create);
router.put('/modifica/:id', pagamentoController.update);
router.get('/:id', pagamentoController.show);
router.delete('/:id', pagamentoController.destroy);

module.exports = router