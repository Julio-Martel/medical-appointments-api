const db = require('../config/db');

const getUsuarios = async(req,res) => {
    const headerToken = req.headers.authorization;

    if(!headerToken){
        return res.status(404).json({
            mensaje: 'Debe iniciar sesion como admistrador para ver todos los usuarios'
        })
    }

    try {

        const [rows] = await db.query(`SELECT * FROM Usuarios`);

        res.status(200).json(
            {
                mensaje: 'Listado de todos los usuarios',
                rows: rows
            })

    } catch(error){
        res.status(500).json({mensaje:'Error interno del servidor'})
    }
}

const deleteUsuarios = async(req,res) => {
    const headerToken = req.headers.authorization;

    if(!headerToken){
        return res.status(404).json({
            mensaje: 'Debe iniciar sesion como administrador para eliminar algun usuario'
        })
    }

    const {id} = req.params;

    try {
        const [resultado] = await db.query(`DELETE FROM Usuarios WHERE id = ?`,[id]);

         if (resultado.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado");
        }

        res.send("Usuario eliminado correctamente");       
        
    } catch(error){
        res.status(500).json({
            mensaje: 'Error del servidor'
        })
    }
}


module.exports = {
    getUsuarios,
    deleteUsuarios
}