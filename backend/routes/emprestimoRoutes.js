const express = require('express');
const EmprestimoController = require('../controller/emprestimoController.js');
const router = express.Router()
const emprestimoController = new EmprestimoController();

router.get('/',emprestimoController.getAll)
router.get('/:ID',emprestimoController.getById)
router.delete('/:ID',emprestimoController.delete)
router.post('/',emprestimoController.create)
router.put('/:ID',emprestimoController.update)
router.post('/filtrar',emprestimoController.filtrar)

module.exports = router;