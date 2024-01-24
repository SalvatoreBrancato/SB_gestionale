const express = require('express');
const router = express.Router();
const fonitoriController = require('../controllers/fornitoriController');

router.get('/', fonitoriController.index);
router.post('/inserisci', fonitoriController.create);
router.put('/modifica/:id', fonitoriController.update);
router.get('/:id', fonitoriController.show);
router.delete('/:id', fonitoriController.destroy);

module.exports = router