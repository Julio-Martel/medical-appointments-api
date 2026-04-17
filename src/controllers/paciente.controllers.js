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
    const hashedPass = req.headers.autorizathion;

    if(!hashedPass){
        return res.send('Debe iniciar sesion para ver sus turnos');
    }


    
}


module.exports = {
    creatTurno,
    getTurnos
};
