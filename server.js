const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const talleresRoutes = require("./routes/talleres");
const gruposRoutes = require("./routes/grupos");
const estudiantesRoutes = require("./routes/estudiantes");
const rotacionesRoutes = require("./routes/rotaciones");
const rotacionAsignacionesRoutes = require("./routes/rotacionAsignaciones");
const asistenciasRoutes = require("./routes/asistencias");
const estadoRotacionesRoutes = require("./routes/estadoRotaciones");
const importarEstudiantesRoutes = require("./routes/importarEstudiantes");
const reportesRoutes = require("./routes/reportes");
const usuariosRoutes = require("./routes/usuarios");
console.log(importarEstudiantesRoutes);

app.get("/", (req, res) => {
    res.send("🚀 TallerControl Backend funcionando");
});

app.use("/api/talleres", talleresRoutes);
app.use("/api/grupos", gruposRoutes);
app.use("/api/estudiantes", estudiantesRoutes);
app.use("/api/rotaciones", rotacionesRoutes);
app.use("/api/rotacion-asignaciones", rotacionAsignacionesRoutes);
app.use("/api/asistencias", asistenciasRoutes);
app.use("/api/estado-rotaciones", estadoRotacionesRoutes);
app.use("/api/importar-estudiantes", importarEstudiantesRoutes);
app.use("/api/reportes", reportesRoutes);
app.use("/api/usuarios", usuariosRoutes);

app.get("/prueba-directa", (req, res) => {
    res.send("FUNCIONA");
});

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});

setInterval(() => {
    console.log("Servidor vivo...");
}, 10000);