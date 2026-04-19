const verificarRolPaciente = (req,res,next) => {

    if (req.usuario.rol !== 'paciente') {
        return res.status(403).json({ mensaje: 'Debe ser paciente para realizar esta accion.' });
    }

    next();
}

const verificarRolMedico = (req,res,next) => {
    if(req.usuario.rol !== 'medico'){
        return res.status(403).json({ mensaje: 'Debe ser medico para realizar esta accion.' });
    } 

    next();
}

const verificarRolAdmin = (req,res,next) => {
     if(req.usuario.rol !== 'admin'){
        return res.status(403).json({ mensaje: 'Debe ser administrador para realizar esta accion.' });
    } 
    
    next();
}

module.exports = {
    verificarRolPaciente,
    verificarRolMedico,
    verificarRolAdmin
}

