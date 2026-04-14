const express = require('express');
const router = express.Router();

const authController = require('../middlewares/auth.controller');
const authMiddleware = require('../middlewares/authMiddlewares');
const permisoPaciente = require('../middlewares/auth.permisos');
const pacienteController = require('../controllers/paciente.controllers');


router.post('/login', authController.login);
router.post('/turnos', authMiddleware.authMiddleware, pacienteController.creatTurno);






/*

    COMPLETAR ESTO PARA QUE EL PACIENTE PUEDA REGISTRAR SU TURNO

*/

module.exports = router;