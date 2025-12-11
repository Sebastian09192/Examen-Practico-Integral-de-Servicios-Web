module.exports = function (rolRequerido) {
  return (req, res, next) => {
    if (!req.user || req.user.rol !== rolRequerido) {
      return res.status(403).json({ error: "No autorizado" });
    }
    next();
  };
};
