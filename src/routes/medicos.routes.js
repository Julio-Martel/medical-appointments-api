const express = require('express');
const router = express.Router();

const authController = require('../middlewares/auth.controller');

router.get('/login',authController, )

module.exports = router;