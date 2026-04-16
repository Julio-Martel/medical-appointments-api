const express = require('express');
const app = express();

app.use(express.json());

const adminRoutes = require('../src/routes/admin.routes');
const medicosRoutes = require('../src/routes/medicos.routes');
const pacientesRoutes = require('../src/routes/pacientes.routes');

app.use('/api/admin', adminRoutes);
app.use('/api/medicos', medicosRoutes);
app.use('/api/pacientes', pacientesRoutes);

module.exports = app;