const express = require('express');
const router = express.Router();
const fattureVenditaController = require('../controllers/fattureVenditaController');

router.get('/', fattureVenditaController.index);
router.post('/inserisci', fattureVenditaController.create);
router.put('/modifica/:id', fattureVenditaController.update);
router.get('/:id', fattureVenditaController.show);
router.delete('/:id', fattureVenditaController.destroy)

module.exports = router