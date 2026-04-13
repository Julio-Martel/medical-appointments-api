const express = require('express');
const router =  express.Router();

const authController = require('../middlewares/auth.controller');
const adminController = require('../controllers/admin.controller');

//LOGEO Y REGISTRO DEL ADMINISTRADOR
router.post('/login',authController.login);
router.post('/register', authController.register);


//OBTENER TODOS LOS USUARIOS
router.get('/', adminController.getUsuarios);


module.exports = router;

