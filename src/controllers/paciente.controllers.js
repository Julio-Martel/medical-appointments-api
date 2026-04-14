const db = require('../config/db');

const creatTurno = async(req,res) => {
    const {fecha_hora, } = req.body;

    try {

        /*const [resultado] = await db.query(`INSERT INTO Turnos(fecha_hora)
            VALUES() `)
            
            
            
                COMPLETAR TODO ESO */



    } catch(error){

    }
}

module.exports = {creatTurno};
