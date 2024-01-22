const express = require('express');
const router = express.Router();
const fattureAcquistiController = require('../controllers/fattureAcquistiController')


router.get('/', fattureAcquistiController.index);
router.post('/inserisci', fattureAcquistiController.create);
router.put('/modifica/:id', fattureAcquistiController.update);
router.get('/:id', fattureAcquistiController.show);
router.delete('/:id', fattureAcquistiController.destroy)

module.exports = router