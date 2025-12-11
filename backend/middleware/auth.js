const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const header = req.headers["authorization"];

  if (!header)
    return res.status(401).json({ error: "Token requerido" });

  const parts = header.split(" ");
  if (parts.length !== 2 || parts[0] !== "Bearer")
    return res.status(400).json({ error: "Formato de token inválido" });

  const token = parts[1];

  try {
    req.user = jwt.verify(token, "secretjwtkey");
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
};
