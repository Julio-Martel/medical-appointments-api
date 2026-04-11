const express = require('express');
const app = express();

app.use(express.json());

const adminRoutes = require('../src/routes/admin.routes');
const medicosRoutes = require('../src/routes/medicos.routes');
const pacientesRoutes = require('../src/routes/pacientes.routes');

app.use('/admin', adminRoutes);
app.use('/medicos', medicosRoutes);
//app.use('/pacientes', pacientesRoutes);

module.exports = app;