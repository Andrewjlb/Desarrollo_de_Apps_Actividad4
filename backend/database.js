const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Cambia esto según tu configuración de MySQL.
    password: '', // Deja vacío si no usas contraseña.
    database: 'estudiantesdb' // Cambia al nombre de tu base de datos.
});

db.connect(err => {
    if (err) {
        console.error("Error al conectar a la base de datos:", err);
        return;
    }
    console.log("Conectado a la base de datos");
});

// Crear registro
app.post('/api/estudiante', (req, res) => {
    const { cedula, nombre, apellido, email, edad, estado } = req.body;
    const sql = "INSERT INTO estudiante (cedula, nombre, apellido, email, edad, estado) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(sql, [cedula, nombre, apellido, email, edad, estado], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al crear el registro");
            return;
        }
        res.status(201).json({ message: "Registro creado", id: result.insertId });
    });
});

// Obtener todos los registros
app.get('/api/estudiante', (req, res) => {
    const sql = "SELECT * FROM estudiante";
    db.query(sql, (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al obtener los registros");
            return;
        }
        res.json(results);
    });
});

// Actualizar un registro
app.put('/api/estudiante/:cedula', (req, res) => {
    const { cedula } = req.params;
    const { nombre, apellido, email, edad, estado } = req.body;
    const sql = "UPDATE estudiante SET nombre = ?, apellido = ?, email = ?, edad = ?, estado = ? WHERE cedula = ?";
    db.query(sql, [nombre, apellido, email, edad, estado, cedula], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al actualizar el registro");
            return;
        }
        res.json({ message: "Registro actualizado" });
    });
});

// Eliminar un registro
app.delete('/api/estudiante/:cedula', (req, res) => {
    const { cedula } = req.params;
    const sql = "DELETE FROM estudiante WHERE cedula = ?";
    db.query(sql, [cedula], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error al eliminar el registro");
            return;
        }
        res.status(200).json({ message: "Registro eliminado correctamente" });
    });
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));