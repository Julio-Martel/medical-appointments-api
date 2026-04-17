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
    const hashedPass = req.headers.autorizathion;

    if(!hashedPass){
        return res.send('Debe iniciar sesion para poder ver todos turnos que le fueron asignados.');
    }



}




module.exports = {
    getTurnos,
    confirmacionTurno
}