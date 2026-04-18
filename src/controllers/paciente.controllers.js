const db = require('../config/db');

const creatTurno = async(req,res) => {
    
    if(!req.body || Object.keys(req.body).length === 0){
        return res.status(404).json({
            mensaje: 'Debe mandar los datos en el body'
        });
    }
    
    const {fecha_hora, usuario_id, medico_id} = req.body;

    if(!fecha_hora || !usuario_id || !medico_id){
        return res.status(404).json({
            mensaje: 'Debe mandar todos los datos: fecha_hora,medico_id y fecha_hora'
        });
    }

    try {

        const [horarioExistente] = await db.query(`SELECT * FROM Turnos WHERE fecha_hora = ?`,[fecha_hora]);
        
        if(horarioExistente.length > 0) {
            return res.status(404).json(
                {
                    mensaje: 'Dia ya ocupado o fecha pasada'
                });
        }

        const [usuarioExistente] = await db.query('SELECT * FROM Usuarios WHERE id = ? AND rol = ? ', [usuario_id, "paciente"]);

        if(usuarioExistente. length === 0){
            return res.status(404).json({
                mensaje: 'usuario no existente'
            })
        }

        const [medicoExistente] = await db.query(`SELECT * FROM Usuarios WHERE id = ? AND rol = ?`, [medico_id, "medico"]);

        if(medicoExistente.length === 0) {
            return res.status(404).json({
                mensaje: 'Medico no existente'
            })
        }

        const [turnoCreado] = await db.query(`INSERT INTO Turnos(fecha_hora,usuario_id,medico_id)
        VALUES (?,?,?)`,
        [fecha_hora,usuario_id,medico_id]);


        res.json({
            mensaje: 'Turno creado',
            id: turnoCreado.insertId,
            fecha_hora,
            usuario_id,
            medico_id
        });

    } catch(error){
        console.log(error);
    }
}

const getTurnos = async(req,res) => {
    const hashedPass = req.headers.authorization;

    if(!hashedPass){
        return res.send('Debe iniciar sesion para ver sus turnos');
    }

    const id_Usuario = req.usuario.id;

    try {
        const [turnosFiltrados] = await db.query(`
            SELECT * FROM Turnos WHERE usuario_id = ? `,[id_Usuario]);

        if(turnosFiltrados.length === 0){
            return res.status(404).json({
                mensaje: 'No hay turnos con ese id'
            })
        }

        res.status(200).json({
            mensaje: 'Todos tus turnos',
            turnos: turnosFiltrados
        })
    } catch(error){
        console.log(error);
    }
}

const cancelarTurno = async(req,res) => {
    if(!req.body || Object.keys(req.body).length === 0){
        return res.send('Debe mandar el estado en el body.');
    }
    
    const {id} = req.params;
    const hashedPass = req.headers.authorization;

    if(!hashedPass){
        return res.send('Debe iniciar sesion y ser paciente para cancelar un turno.')
    }

    try{
        const id_Usuario = req.usuario.id;

        const [turnoCancelado] = await db.query(`
            UPDATE Turnos SET estado = ? WHERE usuario_id = ? AND id = ?
            `,['cancelado', id_Usuario, id]);


        if(turnoCancelado.length === 0){
            return res.send('No existe turno con ese id.')
        }        

        res.status(200).json({
            mensaje: 'Turno cancelado',
            turno: turnoCancelado 
        })

    } catch(error){
        console.log(error)
    }
}

module.exports = {
    creatTurno,
    getTurnos,
    cancelarTurno
};
