import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// para manejar variables de ambiente

import * as dotenv from "dotenv";
dotenv.config();
import path from "path";

// importando modulos personalizados

import { handleErrors } from "./errors.js";
import {
  agregarEquipo,
  verEquipos,
  actualizarEquipo,
  eliminarEquipo,
  obtenerDetallesEquipoPorId,
  buscarEquiposPorParametro,
} from "./consulta.js";
import fs from "fs";

// importando express y cors

import express from "express";
const app = express();
import cors from "cors";
import multer from "multer";

//const currentFileUrl = import.meta.url;
//const __dirname = path.dirname(new URL(import.meta.url).pathname);

// middleware para parsear body enviado al servidor

app.use(express.json());
app.use(cors());

//0. GET para redirigir a la página de login en la ruta raíz
app.get("/", (req, res) => {
  res.redirect("/login");
});

// Ruta para ver la página de login
app.get("/login", (req, res) => {
  // Aquí devuelves la página de login, ya sea renderizando un archivo HTML, un template de tu framework o como prefieras manejarlo
});

//// levantando servidor USANDO UN PUERTO PREDETERMINADO EN .ENV
const PORT = process.env.PORT || 3002;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../front/public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.listen(PORT, () => {
  console.log("servidor listo en http://localhost:" + PORT);
});

// Función para generar token JWT
const generateToken = (user) => {
  return jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h", // Cambia esto según tus necesidades
  });
};

// Función para verificar credenciales y generar token
const login = async (req, res) => {
  const { username, password } = req.body;
  // Aquí deberías buscar el usuario en tu base de datos y verificar las credenciales
  // Ejemplo de validación básica con usuario y contraseña harcoded
  if (username === "admin" && password === "password") {
    const user = { id: 1, username: "admin", role: "admin" }; // Ejemplo de usuario encontrado en la base de datos
    const token = generateToken(user);
    res.json({ token });
  } else {
    res.status(401).json({ error: "Credenciales inválidas" });
  }
};

// Ruta para manejar el inicio de sesión
app.post("/login", login);

// Middleware para verificar el token JWT en las rutas protegidas
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

//rutas del enrutador/ Api Rest, enlazar ruta con funcion BD

//1. GET para ver todos los equipos registrados en la tabla
app.get("/equipos", async (req, res) => {
  try {
    const equipos = await verEquipos();
    res.json(equipos); //respuesta del servidor que es la respuesta que dio la funcion de consulta a BD
  } catch (error) {
    console.error("Error en la ruta /equipos (verEquipos): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al obtener los equipos: " + message);
  }
});


//2. POST para ingresar un equipo en la tabla
app.post("/equipos", async (req, res) => {
  const {
    codigo_inventario,
    tipo_equipo,
    numero_serie,
    marca,
    modelo,
    sistema_operativo,
    memoria_ram,
    procesador,
    almacenamiento,
    numero_serie_cargador,
    monitor,
    teclado,
    raton,
    accesorios,
    suscripcion_office,
    ubicacion,
    status,
  } = req.body;

  try {
    /*console.log("valor req.body en la ruta /equipos: ", req.body);*/
    await agregarEquipo({
      codigo_inventario,
      tipo_equipo,
      numero_serie,
      marca,
      modelo,
      sistema_operativo,
      memoria_ram,
      procesador,
      almacenamiento,
      numero_serie_cargador,
      monitor,
      teclado,
      raton,
      accesorios,
      suscripcion_office,
      ubicacion,
    });
    res.send("equipo agregado con éxito");
    /*console.log("valor req.body en la ruta /equipos: ", req.body);*/
  } catch (error) {
    console.error("Error en la ruta /equipos (agregarEquipo): ", error);
    const { status, message } = handleErrors(error.code);
    res.status(status).send("Error al agregar el equipo: " + message);
  }
});

app.get("/equipos/:id", async (req, res) => {
  const equipoId = req.params.id;

  try {
    // Usar la función 'obtenerDetallesEquipoPorId' para obtener los detalles del equipo por ID
    const equipoDetalles = await obtenerDetallesEquipoPorId(equipoId);
    res.json(equipoDetalles);
  } catch (error) {
    console.error("Error al obtener detalles del equipo:", error);
    res
      .status(500)
      .send("Error interno del servidor al obtener detalles del equipo");
  }
});

app.get("/buscarEquipo", async (req, res) => {
  const parametro = req.query.parametro;
  /*console.log("Parámetro de búsqueda:", parametro);*/

  if (!parametro) {
    return res
      .status(400)
      .json({ error: 'El parámetro de búsqueda "parametro" es necesario.' });
  }

  try {
    console.log("Antes de buscarEquiposPorParametro");
    const resultadoBusqueda = await buscarEquiposPorParametro(parametro);
    console.log("Después de buscarEquiposPorParametro");
    res.json(resultadoBusqueda);
  } catch (error) {
    console.error("Error al realizar la búsqueda:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al realizar la búsqueda." });
  }
});

//3. PUT para modificar el equipo
app.put("/equipos/actualizar/:id", upload.single("foto"), async (req, res) => {
  const equipoId = req.params.id;
  const equipoData = req.body;

  try {
   /* console.log("Iniciando actualización de equipo...");
    console.log("ID del equipo a actualizar:", equipoId);
    console.log("Datos del equipo a actualizar:", equipoData);*/

    // Obtener el nombre del archivo original si existe
    const originalFileName = req.file ? req.file.originalname : null;
    console.log("Nombre del archivo original:", originalFileName);

    // Si existe el archivo original, procede a renombrarlo
    if (originalFileName) {
      const codigoInventario = equipoData.codigo_inventario;
      const newFileName = `${codigoInventario}-${originalFileName}`;
      console.log("Nuevo nombre del archivo:", newFileName);

      const oldFilePath = req.file.path;
      console.log("Ruta original del archivo:", oldFilePath);

      const newFilePath = `../front/public/uploads/${codigoInventario}.jpg`;
      console.log("Ruta nueva del archivo:", newFilePath);

      try {
        fs.renameSync(oldFilePath, newFilePath);
        console.log("Archivo renombrado correctamente.");
      } catch (err) {
        console.error("Error al renombrar el archivo:", err);
        throw err;
      }
    }

    // Actualizar equipo con los datos proporcionados
    const updatedEquipo = await actualizarEquipo(equipoId, equipoData);
    console.log("Equipo actualizado con éxito:", updatedEquipo);

    res.status(200).json({
      ok: true,
      message: "Equipo actualizado con éxito",
      result: updatedEquipo,
    });
  } catch (error) {
    console.error("Error al actualizar equipo:", error.message);
    const { status, message } = handleErrors(error.code);
    res.status(status || 500).json({
      ok: false,
      result: message || "Error interno del servidor",
    });
  }
});

//5. DELETE para eliminar un registro de la tabla segun ID
app.delete("/equipos/:id", async (req, res) => {
  const equipoId = req.params.id;
  try {
    const result = await eliminarEquipo(equipoId);

    return res.status(200).json({
      ok: true,
      message: "*** Equipo eliminado con éxito ***",
      result,
    });
  } catch (error) {
    console.error(
      "Error proveniente de respuesta de función eliminarEquipo: ",
      error
    );
    console.error(
      "Error Code proveniente de respuesta de función eliminarEquipo: ",
      error.code
    );

    const { status, message } = handleErrors(error.code);

    return res.status(status).json({
      ok: false,
      result: message + " : " + error.column,
    });
  }
});





//0. GET para ver ruta raiz
app.use("*", (req, res) => {
  res.json({ ok: false, result: "404 Pagina no Encontrada" });
});
