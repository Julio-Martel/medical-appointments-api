const verificarRolPaciente = (req,res,next) => {

    if (req.usuario.rol !== 'paciente') {
        return res.status(403).json({ mensaje: 'Debe ser paciente para realizar esta accion.' });
    }

    next();

}

module.exports = {
    verificarRolPaciente
}

