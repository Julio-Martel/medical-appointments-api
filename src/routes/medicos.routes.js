const express = require('express');
const router = express.Router();

const authController = require('../middlewares/auth.controller');
const authMiddleware = require('../middlewares/authMiddlewares');
const medicosControllers = require('../controllers/medico.controller');


router.post('/login', authController.login);
router.get('/turnos', authMiddleware.authMiddleware, medicosControllers.getTurnos);
router.patch('/turnos/:id', authMiddleware.authMiddleware, medicosControllers.confirmacionTurno);




module.exports = router;