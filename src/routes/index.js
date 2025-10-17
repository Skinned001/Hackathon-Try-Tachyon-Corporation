import { Router } from "express";
import { AuthRouter } from "./auth.route.js";
import { ejercicioRoutes } from "./ejercicio.route.js"; // 1. Importa tus rutas de ejercicios

export const routes = Router();

// Asigna un prefijo a cada enrutador
// Todas las rutas en AuthRouter comenzarán con /api/auth
routes.use("/auth", AuthRouter); 

// Todas las rutas en ejercicioRoutes comenzarán con /api/ejercicios
routes.use("/ejercicios", ejercicioRoutes); 

// Si tuvieras más rutas, las añadirías aquí...
// routes.use("/estudiantes", estudianteRoutes);