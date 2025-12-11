const db = require("../db");
const crypto = require("crypto");

// Claves para cifrado
const KEY = crypto.randomBytes(32);
const IV = crypto.randomBytes(16);

function encrypt(text) {
    const cipher = crypto.createCipheriv("aes-256-cbc", KEY, IV);
    let encrypted = cipher.update(text, "utf-8", "hex");
    encrypted += cipher.final("hex");
    return encrypted;
}

module.exports = {
    getAll: async (req, res) => {
        try {
            const [rows] = await db.query("SELECT id, nombre, fecha_creacion, fecha_modificacion FROM pacientes WHERE activo = 1");
            res.json(rows);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getOne: async (req, res) => {
        try {
            const [rows] = await db.query("SELECT * FROM pacientes WHERE id = ?", [req.params.id]);
            res.json(rows[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    create: async (req, res) => {
        const { nombre, correo, telefono } = req.body;

        try {
            await db.query(`
                INSERT INTO pacientes (nombre, correo, telefono, fecha_creacion, fecha_modificacion, activo)
                VALUES (?, ?, ?, NOW(), NOW(), 1)
            `, [nombre, encrypt(correo), encrypt(telefono)]);

            res.status(201).json({ message: "Paciente creado correctamente" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    update: async (req, res) => {
        const { nombre, correo, telefono } = req.body;

        try {
            await db.query(`
                UPDATE pacientes SET 
                nombre = ?, 
                correo = ?, 
                telefono = ?, 
                fecha_modificacion = NOW()
                WHERE id = ?
            `, [nombre, encrypt(correo), encrypt(telefono), req.params.id]);

            res.json({ message: "Paciente actualizado" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            await db.query("UPDATE pacientes SET activo = 0 WHERE id = ?", [req.params.id]);
            res.json({ message: "Paciente eliminado (borrado lógico)" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
