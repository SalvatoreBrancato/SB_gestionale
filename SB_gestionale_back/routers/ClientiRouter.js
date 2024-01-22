const express = require('express');
const router = express.Router();
const clientiController = require('../controllers/ClientiController');


router.get('/clienti', clientiController.index);
router.post('/clienti', clientiController.create);
router.get('/clienti/:id', clientiController.show);
router.put('/clienti/:id', clientiController.update);
router.delete('/clienti/:id', clientiController.destroy)

module.exports = router