const express = require('express');
const router =  express.Router();

const authController = require('../middlewares/auth.controller');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authMiddlewares');
const permisos = require('../middlewares/auth.permisos')

//LOGEO Y REGISTRO DEL ADMINISTRADOR
router.post('/login',authController.login);
router.post('/register', authController.register);

//OBTENER TODOS LOS USUARIOS
router.get('/', authMiddleware.authMiddleware, permisos.verificarRolAdmin,  adminController.getUsuarios);
//ELIMINAR USUARIO
router.delete('/:id', authMiddleware.authMiddleware, permisos.verificarRolAdmin, adminController.deleteUsuarios);
//VER TODOS LOS TURNOS
router.get('/turnos', authMiddleware.authMiddleware, permisos.verificarRolAdmin, adminController.getTurnos);

module.exports = router;

