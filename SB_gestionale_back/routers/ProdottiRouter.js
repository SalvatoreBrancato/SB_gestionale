const express = require('express');
const router = express.Router();
const prodottiController = require('../controllers/prodottiController');

router.get('/', prodottiController.index);
router.get('/storico', prodottiController.indexStoricoProdotti);
router.post('/inserisci', prodottiController.create);
router.put('/modifica/:id', prodottiController.update);
router.get('/:id', prodottiController.show);
router.delete('/:id', prodottiController.destroy);

module.exports = router