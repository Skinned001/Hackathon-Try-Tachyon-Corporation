import { Router } from "express";
import {
    //createEjercicio,
  //  getAllEjercicios,
  //  getEjercicioById,
  //  updateEjercicio,
 //   deleteEjercicio,
    getRandomEjercicio, // <-- 1. Importa la nueva función
} from "../controllers/ejercicio.controller.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { authAdmin } from "../middlewares/authAdmin.js";
import { validator } from "../middlewares/validator.js";

export const ejercicioRoutes = Router();

// * Crear un nuevo ejercicio (solo admin)
// RUTA FINAL: POST /api/ejercicios
//ejercicioRoutes.post("/", authMiddleware, authAdmin, validator, createEjercicio);

// * Obtener todos los ejercicios (usuario autenticado)
// RUTA FINAL: GET /api/ejercicios
//ejercicioRoutes.get("/", authMiddleware, getAllEjercicios);

// * OBTENER UN EJERCICIO ALEATORIO (usuario autenticado) <-- 2. AÑADE LA NUEVA RUTA AQUÍ
// RUTA FINAL: GET /api/ejercicios/random
//ejercicioRoutes.get("/random", authMiddleware, getRandomEjercicio);
ejercicioRoutes.get("/random", getRandomEjercicio);

// * Obtener un ejercicio por id (usuario autenticado)
// RUTA FINAL: GET /api/ejercicios/:id
//ejercicioRoutes.get("/:id", authMiddleware, getEjercicioById);

// * Actualizar un ejercicio por id (solo admin)
// RUTA FINAL: PUT /api/ejercicios/:id
//ejercicioRoutes.put("/:id", authMiddleware, adminMiddleware, validator, updateEjercicio);

// * Eliminar un ejercicio por id (solo admin)
// RUTA FINAL: DELETE /api/ejercicios/:id
//ejercicioRoutes.delete("/:id", authMiddleware, adminMiddleware, deleteEjercicio);