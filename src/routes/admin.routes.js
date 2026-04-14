const express = require('express');
const router =  express.Router();

const authController = require('../middlewares/auth.controller');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authMiddlewares');

//LOGEO Y REGISTRO DEL ADMINISTRADOR
router.post('/login',authController.login);
router.post('/register', authController.register);

//OBTENER TODOS LOS USUARIOS
router.get('/', authMiddleware.authMiddleware, adminController.getUsuarios);
//ELIMINAR USUARIO
router.delete('/:id', authMiddleware.authMiddleware, adminController.deleteUsuarios);
//VER TODOS LOS TURNOS
//router.get('/turnos', authMiddleware.authMiddleware, adminController.getTurnos);

module.exports = router;

