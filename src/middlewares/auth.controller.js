const jwt = require('jsonwebtoken');
const db = require('../config/db');
const bcrypt = require('bcrypt');

const login = async(req,res) => {
    if(!req.body ||Object.keys(req.body).length === 0){
        return res.send('No puede enviar con el body vacio');
    }

    const {email,pass} = req.body;

    if(!email || !pass){
        return res.send('Debe llenar todos los campos para iniciar sesion.')
    }

    try {

        const [rows] = await db.query(`SELECT * FROM Usuarios WHERE email = ?`,[email]);

        const comparaHash = bcrypt.compare(pass, rows[0].pass);

        if(rows.length === 0 && comparaHash){
            return res.status(404).json({
                mensaje: "Usuario no encontrado"
            })
        }

        const user = rows[0];

        const token = jwt.sign({
            id: user.id,
            email: user.email, 
            pass: user.pass, 
            rol: user.rol},
            'secreto',{expiresIn: '1h'})
   
        res.json({
            mensaje:'Login correcto',
            token: token
        })

    } catch(error){
        res.status(500).json('Error del servidor');
    }

}

const register = async(req, res) => {
    try {

        if(!req.body || Object.keys(req.body).length === 0){
            return res.send('Debe mandar algo en el body');
        }


        const { nombre, email, pass, rol } = req.body;


        if(!nombre || !email || !pass || !rol){
            return res.send('Debe completar todo el body');   
        }

        const [rows] = await db.query(
            'SELECT * FROM Usuarios WHERE email = ?',
            [email]
        );

        if (rows.length > 0) {
            return res.status(409).json({ mensaje: 'Usuario duplicado' });
        }

        const hashedPass = await bcrypt.hash(pass, 10);

        const [resultado] = await db.query(
            `INSERT INTO Usuarios(nombre, email, pass, rol)
             VALUES(?, ?, ?, ?)`,
            [nombre, email, hashedPass, rol]
        );

        res.status(201).json({
            id: resultado.insertId,
            nombre,
            email,
            rol
        });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ mensaje: 'Error en el servidor' });
    }
};

module.exports = {
    login,
    register
};