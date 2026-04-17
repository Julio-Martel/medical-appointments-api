const express = require('express');
const router = express.Router();

const authController = require('../middlewares/auth.controller');
const controlarToken = require('../middlewares/authMiddlewares');
const permisoPaciente = require('../middlewares/auth.permisos');
const pacienteController = require('../controllers/paciente.controllers');

//LOGEARSE
router.post('/login', authController.login);

router.post('/turnos', controlarToken.authMiddleware, permisoPaciente.verificarRolPaciente,  pacienteController.creatTurno);
router.get('/turnos', controlarToken.authMiddleware, permisoPaciente.verificarRolPaciente, pacienteController.getTurnos);
router.post('/turnos/:id', controlarToken.authMiddleware, permisoPaciente.verificarRolPaciente, pacienteController.cancelarTurno);



module.exports = router;