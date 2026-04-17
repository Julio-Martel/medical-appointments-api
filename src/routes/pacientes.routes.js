const express = require('express');
const router = express.Router();

const authController = require('../middlewares/auth.controller');
const authMiddleware = require('../middlewares/authMiddlewares');
const permisoPaciente = require('../middlewares/auth.permisos');
const pacienteController = require('../controllers/paciente.controllers');

//LOGEARSE
router.post('/login', authController.login);

router.post('/turnos', authMiddleware.authMiddleware, permisoPaciente.verificarRolPaciente,  pacienteController.creatTurno);
router.get('/turnos', authMiddleware.authMiddleware, permisoPaciente.verificarRolPaciente, pacienteController.getTurnos);


module.exports = router;