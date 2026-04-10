const express = require('express');
const app = express();

app.use(express.json());

const medicosRoutes = require('../src/routes/medicos.routes');
const pacientesRoutes = require('../src/routes/pacientes.routes');

app.use('/medicos', medicosRoutes);
app.use('/pacientes', pacientesRoutes);

module.exports = app;