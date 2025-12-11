DATACARE SOLUTIONS S.A. – PROYECTO INTEGRADOR
Aplicación Web con API REST + SOAP + JWT + Rate Limit + Cifrado + Borrado Lógico
Curso: Tecnologías y Sistemas Web III
Estudiantes: Sebastian Alpizar - Alex Ledezma
Fecha: 11-12-2025

============================================================

DESCRIPCIÓN GENERAL DEL PROYECTO
============================================================

Este proyecto implementa un sistema web completo para la empresa ficticia "DataCare Solutions S.A.", dedicada a la gestión de expedientes de pacientes para pequeñas clínicas. El objetivo es desarrollar una solución funcional que incluya:

• API REST para gestionar pacientes
• Frontend simple basado en HTML + JS
• Cifrado de datos sensibles antes de almacenarlos
• Borrado lógico para mantener registros sin eliminarlos físicamente
• Autenticación mediante JWT
• Autorización por rol (admin y user)
• Middleware personalizado (logger, auth, rate limit)
• Servicio SOAP con dos operaciones (sumar y validar nombre)
• Consumo del servicio SOAP desde la misma API
• Evaluación de calidad del frontend con Lighthouse

El sistema fue construido utilizando Node.js + Express en el backend y MySQL/XAMPP como base de datos local.

============================================================
2. ESTRUCTURA DEL PROYECTO

datacare-examen/
├─ backend/
│ ├─ server.js
│ ├─ db.js
│ ├─ routes/
│ │ ├─ pacientes.js
│ │ ├─ auth.js
│ │ └─ soap.js
│ ├─ controllers/
│ │ └─ pacientesController.js
│ ├─ middleware/
│ │ ├─ logger.js
│ │ ├─ auth.js
│ │ └─ rateLimit.js
│ ├─ services/
│ │ └─ soapClient.js
│ ├─ soap/
│ │ ├─ soapService.js
│ │ └─ datacare.wsdl
├─ frontend/
│ ├─ login.html
│ ├─ index.html
│ ├─ create.html
│ ├─ edit.html
│ ├─ soap.html
│ └─ js/
│ └─ api.js
├─ README.md

============================================================
3. INSTALACIÓN Y CONFIGURACIÓN

REQUISITOS:
• Node.js 18+
• MySQL / MariaDB (XAMPP recomendado)
• Navegador Chrome para Lighthouse
• Live Server (Obligatorio para Lighthouse)

PASOS:

Instalar dependencias
Desde la carpeta backend:
npm install

Crear la base de datos en phpMyAdmin:
CREATE DATABASE datacare;

Crear la tabla pacientes:
CREATE TABLE pacientes (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
correo TEXT,
telefono TEXT,
creado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
modificado TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
activo INT DEFAULT 1
);

Ajustar credenciales en backend/db.js

Ejecutar el backend:
node server.js
Mostrará:
API REST corriendo en http://localhost:3000

SOAP corriendo en http://localhost:8001/wsdl?wsdl

Abrir el frontend con:
Live Server
O manualmente:
file:///…/datacare-examen/frontend/login.html

============================================================
4. AUTENTICACIÓN Y ROLES

El sistema utiliza JWT con dos roles:

• admin → puede crear, editar, ver y eliminar (borrado lógico)
• user → solo puede listar y ver detalle

LOGIN:
POST http://localhost:3000/api/login

Body: { "username": "admin", "password": "admin123" }

El token se almacena en localStorage y se envía en cada solicitud como:
Authorization: Bearer <token>

============================================================
5. API REST DE PACIENTES

ENDPOINTS:

GET /api/pacientes
GET /api/pacientes/:id
POST /api/pacientes
PUT /api/pacientes/:id
DELETE /api/pacientes/:id (borrado lógico)

REQUISITOS:
• Autenticación obligatoria
• DELETE solo accesible para admin

CAMPOS CIFRADOS EN BD:
• correo
• telefono

Borrado lógico:
activo = 0 → no aparecerá en el frontend

============================================================
6. MIDDLEWARE IMPLEMENTADOS

logger.js
Registra la ruta, método y hora de cada solicitud.

auth.js
Valida JWT y adjunta req.user.

rateLimit.js
Limita a 30 solicitudes por minuto.
Devuelve 429 si se excede el límite.

============================================================
7. SERVICIO SOAP

El proyecto incluye un servidor SOAP local con dos operaciones:

sumar(a, b)
Devuelve un número con la suma.

validar(nombre)
Devuelve true si el nombre tiene más de 3 letras.

ARCHIVOS SOAP:
• soap/soapService.js → expone el servicio
• soap/datacare.wsdl → definición WSDL
• services/soapClient.js → cliente que lo consume

RUTAS PARA CONSUMIRLO DESDE EL FRONTEND:
GET /api/soap/sumar?a=3&b=4
GET /api/soap/validar?nombre=Sebas

============================================================
8. FRONTEND

Tecnologías: HTML + CSS mínimo + JavaScript puro.

Páginas:
• login.html → login y generación de token
• index.html → lista de pacientes
• create.html → registra un nuevo paciente
• edit.html → edita un paciente
• soap.html → pruebas del servicio SOAP

Todas las solicitudes usan fetch() con token JWT.

============================================================
9. SEGURIDAD IMPLEMENTADA

• JWT con expiración
• Roles basados en token
• Rate limiting
• Cifrado AES de datos sensibles
• Borrado lógico
• Validación de token antes de acceder a rutas protegidas

============================================================
10. EVALUACIÓN DE CALIDAD (LIGHTHOUSE)

Para medir la calidad del frontend:

Abrir login.html con Live Server

Ejecutar Lighthouse en Chrome

Registrar puntajes de:
• Performance
• Accessibility
• Best Practices
• SEO

Resultado obtenido en pruebas:
• Performance: 100
• Accessibility: 82
• Best Practices: 100
• SEO: 90

Esto cumple con los requerimientos del examen.

============================================================
11. USO DE IA DURANTE EL DESARROLLO

Se utilizó asistencia de IA (ChatGPT) para:

• Generación inicial de estructura del proyecto
• Creación de rutas REST
• Implementación de SOAP
• Middleware de autenticación y rate limit
• Corrección de errores en XML del WSDL
• Diseño del frontend y API calls
• Optimización del README
• Explicaciones técnicas para el informe

El código final fue revisado, ajustado y probado manualmente.

============================================================
12. CONCLUSIONES

El proyecto cumple todos los requisitos del examen integrador:
• API REST funcional
• CRUD completo con borrado lógico
• Datos sensibles cifrados
• Autenticación + autorización
• Middleware personalizado
• Servicio SOAP creado y consumido
• Rate limiting operativo
• Evaluación de calidad con Lighthouse
• Documentación completa

Demuestra dominio en diseño de APIs, integración de servicios SOAP, seguridad web y buenas prácticas en desarrollo full-stack.

============================================================
13. CONTACTO / AUTOR

Estudiantes: Sebastian Alpizar - Alex Ledezma
Curso: Tecnologías y Sistemas Web III
Universidad Técnica Nacional