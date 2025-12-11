const express = require("express");
const cors = require("cors");
const logger = require("./middleware/logger");
const auth = require("./middleware/auth");
const rateLimit = require("./middleware/rateLimit");
const pacientesRoutes = require("./routes/pacientes");
const soapService = require("./soap/soapService");
const authRoutes = require("./routes/auth");
const soapRoutes = require("./routes/soap");

const app = express();

app.use(express.json());
app.use(cors());
app.use(logger);

// 1️⃣ LOGIN debe ir primero y SIN protección
app.use("/api", authRoutes);

// 2️⃣ Luego aplicamos el rate limit
app.use(rateLimit);

app.get("/", (req, res) => {
    res.send("API REST de DataCare Solutions funcionando.");
});

// 3️⃣ Rutas protegidas después del login y del rate-limit
app.use("/api/pacientes", pacientesRoutes);

app.use("/api/soap", soapRoutes);

soapService(app);

const PORT = 3000;
app.listen(PORT, () =>
  console.log(`API REST corriendo en http://localhost:${PORT}`)
);
