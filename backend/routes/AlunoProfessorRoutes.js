const AlunoProfessorController =require('../controller/AlunoProfessorController.js')

 const alunoprofessorController = new AlunoProfessorController()
 const express =require('express')
 const router =express.Router();

 router.get('/', alunoprofessorController.getAll);
 router.delete('/:cpf', alunoprofessorController.delete);
 router.post('/',alunoprofessorController.create);
 router.put('/:cpf', alunoprofessorController.update);
 router.post('/filtrar',alunoprofessorController.filtrar)
 module.exports=router;
