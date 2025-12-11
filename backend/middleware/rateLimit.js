const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: 60000,
    max: 30,
    message: "Demasiadas peticiones, inténtalo de nuevo en un minuto."
});
