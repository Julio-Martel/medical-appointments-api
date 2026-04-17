const db = require('../config/db');

const getTurnos = async(req,res) => {
    const headerToken = req.headers.autorizathion

    if(!headerToken){
        return res.send('Debe iniciar sesion para poder ver todos turnos que le fueron asignados.');
    }

    const id = req.usuario.id;

    const [turnosFiltrados] = await db.query(`SELECT * FROM Turnos WHERE medico_id = ?`, [id]);

    if(turnosFiltrados.length === 0){
        return res.status(404).json({
            mensaje: 'No tiene turnos asignados'
        })
    }

    res.status(200).json({
        mensaje: 'Todos los turnos que se te asignaron',
        turnos: turnosFiltrados
    })
}

const confirmacionTurno = async(req,res) => {
    if(!req.body || Object.keys(req.body).length === 0){
        return res.send('Debe mandar el estado en el body');
    }
    
    const hashedPass = req.headers.autorizathion;
    const {id} = req.params;
    const estadoConfirmado = req.body;

    if(!hashedPass){
        return res.send('Debe iniciar sesion para poder ver todos turnos que le fueron asignados.');
    }

    if(estadoConfirmado !== 'confirmado'){
        return res.send('Debe ingresa la palabra: confirmado');
    }

    const [turnoFiltrado] = await db.query(`
        UPDATE Turnos SET estado = ? WHERE id = ?`, ['Confirmado',id]
    );

    return res.status(200).json({
        mensaje: 'Turno confirmado',
        turno: turnoFiltrado
    });
}

module.exports = {
    getTurnos,
    confirmacionTurno
}