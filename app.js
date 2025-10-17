import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { UserModel } from "./src/models/usuario.model.js";
import { ProgresoModel } from "./src/models/progreso.js";
import { EjercicioModel } from "./src/models/ejercicio.js";
import { EstudianteModel } from "./src/models/estudiante.js";
import { routes } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes)

app.listen(PORT, async () => {
    try {
        connectDB();
        console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
    } catch (error) {
        console.log("Error al encender el servidor" + error);
    }
});




