const express = require("express");
const router = express.Router();
const soapClient = require("../services/soapClient");
const auth = require("../middleware/auth");

router.get("/sumar", auth, async (req, res) => {
  try {
    const { a, b } = req.query;
    const result = await soapClient.sumar(a, b);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al consumir SOAP" });
  }
});

router.get("/validar", auth, async (req, res) => {
  try {
    const { nombre } = req.query;
    const result = await soapClient.validar(nombre);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: "Error al consumir SOAP" });
  }
});

module.exports = router;
