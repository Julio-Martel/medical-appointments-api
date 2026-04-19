const db = require('../config/db');

const getTurnos = async(req,res) => {
    const headerToken = req.headers.authorization

    if(!headerToken){
        return res.send('Debe iniciar sesion para poder ver todos turnos que le fueron asignados.');
    }

    try{

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

    } catch(Error){
        console.log(error)
    }

}

const confirmacionTurno = async(req,res) => {
    const hashedPass = req.headers.authorization;
    const {id} = req.params;

    if(!hashedPass){
        return res.send('Debe iniciar sesion para poder ver todos turnos que le fueron asignados.');
    }

    try{

        const [resultado] = await db.query(`
             UPDATE Turnos 
                 SET estado = 'confirmado' 
                     WHERE id = ? AND estado != 'cancelado'
        `, [id]);

        if (resultado.affectedRows === 0) {
        return res.status(400).json({
            mensaje: 'No se puede confirmar el turno porque está cancelado o no existe'
        });
}

        return res.status(200).json({
            mensaje: 'Turno confirmado',
            turno: resultado
        });
        
    } catch(error){
        console.log(error);
    }
}

module.exports = {
    getTurnos,
    confirmacionTurno
}