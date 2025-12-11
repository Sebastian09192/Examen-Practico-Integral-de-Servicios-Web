// frontend/js/api.js
const API_BASE = "http://localhost:3000/api";

function getToken() {
  return localStorage.getItem("token");
}

function getRol() {
  return localStorage.getItem("rol");
}

function protegerPagina() {
  const token = getToken();
  if (!token) {
    alert("Debes iniciar sesión primero");
    window.location.href = "login.html";
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("rol");
  window.location.href = "login.html";
}

// ---------- LOGIN ----------

async function login(event) {
  event.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    if (!res.ok) {
      const error = await res.json();
      document.getElementById("error").textContent = error.error || "Error en login";
      return;
    }

    const data = await res.json();
    localStorage.setItem("token", data.token);
    localStorage.setItem("rol", data.rol);

    window.location.href = "index.html";
  } catch (err) {
    document.getElementById("error").textContent = "Error de conexión con el servidor";
  }
}

// Headers con token
function authHeaders() {
  const token = getToken();
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`
  };
}

// ---------- PACIENTES ----------

async function cargarPacientes() {
  const res = await fetch(`${API_BASE}/pacientes`, {
    headers: { Authorization: `Bearer ${getToken()}` }
  });

  if (!res.ok) {
    console.error("Error al cargar pacientes");
    return;
  }

  const data = await res.json();
  const rol = getRol();
  let html = "";

  data.forEach((p) => {
    html += `<li>
        ${p.nombre}
        (<a href="edit.html?id=${p.id}">Editar</a>)
        
        ${rol === "admin" ? `
          <button onclick="eliminarPaciente(${p.id})" style="margin-left:10px;color:red;">
            Eliminar
          </button>
        ` : ""}
      </li>`;
  });

  document.getElementById("lista").innerHTML = html;
}


async function cargarDatosEdit() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const res = await fetch(`${API_BASE}/pacientes/${id}`, {
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  const data = await res.json();

  document.getElementById("nombre").value = data.nombre;
  document.getElementById("correo").value = data.correo;
  document.getElementById("telefono").value = data.telefono;
}

async function crear(event) {
  event.preventDefault();

  const data = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    telefono: document.getElementById("telefono").value
  };

  await fetch(`${API_BASE}/pacientes`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });

  alert("Paciente creado");
  window.location.href = "index.html";
}

async function editar(event) {
  event.preventDefault();
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  const data = {
    nombre: document.getElementById("nombre").value,
    correo: document.getElementById("correo").value,
    telefono: document.getElementById("telefono").value
  };

  await fetch(`${API_BASE}/pacientes/${id}`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify(data)
  });

  alert("Paciente actualizado");
  window.location.href = "index.html";
}

async function eliminarPaciente(id) {
  const confirmar = confirm("¿Seguro que deseas eliminar este paciente?");
  if (!confirmar) return;

  const res = await fetch(`${API_BASE}/pacientes/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  });

  if (res.ok) {
    alert("Paciente eliminado (borrado lógico)");
    cargarPacientes();
  } else {
    const data = await res.json();
    alert("Error: " + (data.error || "No autorizado"));
  }
}
