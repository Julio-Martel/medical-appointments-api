const express = require('express');
const router =  express.Router();

const authController = require('../middlewares/auth.controller');
const adminController = require('../controllers/admin.controller');
const authMiddleware = require('../middlewares/authMiddlewares');
const permisos = require('../middlewares/auth.permisos')

router.post('/login',authController.login);
router.post('/register', authController.register);

router.get('/', authMiddleware.authMiddleware, permisos.verificarRolAdmin,  adminController.getUsuarios);
router.delete('/:id', authMiddleware.authMiddleware, permisos.verificarRolAdmin, adminController.deleteUsuarios);
router.get('/turnos', authMiddleware.authMiddleware, permisos.verificarRolAdmin, adminController.getTurnos);

module.exports = router;

