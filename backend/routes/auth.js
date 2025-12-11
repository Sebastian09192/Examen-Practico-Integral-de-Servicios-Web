const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Usuarios de prueba
const usuarios = [
  { username: "admin", password: "admin123", rol: "admin" },
  { username: "user", password: "user123", rol: "usuario" }
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  const encontrado = usuarios.find(
    (u) => u.username === username && u.password === password
  );

  if (!encontrado) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const token = jwt.sign(
    { username: encontrado.username, rol: encontrado.rol },
    "secretjwtkey",
    { expiresIn: "1h" }
  );

  res.json({ token, rol: encontrado.rol });
});

module.exports = router;
