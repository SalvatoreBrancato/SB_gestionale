const express = require('express');
const router = express.Router();
const clientiController = require('../controllers/clientiController');


router.get('/', clientiController.index);
router.post('/inserisci', clientiController.create);
router.put('/modifica/:id', clientiController.update);
router.get('/:id', clientiController.show);
router.delete('/:id', clientiController.destroy)

module.exports = router