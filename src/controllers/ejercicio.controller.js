// Agrega estas importaciones si no las tienes al inicio del archivo
import { EjercicioModel } from '../models/ejercicio.js';
import { ConceptoGramaticalModel } from '../models/conceptoGramatical.js';
import { sequelize } from '../config/database.js';

// ... (aquí van tus otras funciones como createEjercicio, getAllEjercicios, etc.)

// NUEVA FUNCIÓN para obtener un ejercicio aleatorio
// en src/controllers/ejercicio.controller.js

export const getRandomEjercicio = async (req, res) => {
    try {
        const ejercicio = await EjercicioModel.findOne({
            order: [sequelize.fn('RAND')],
            include: [{
                model: ConceptoGramaticalModel,
                as: 'concepto'
            }]
        });

        if (!ejercicio) {
            return res.status(404).json({ message: 'No se encontraron ejercicios.' });
        }

        // --- INICIO DE LA CORRECCIÓN ---
        // Verificamos si el campo es un string (y no nulo)
        if (ejercicio.opciones_adicionales && typeof ejercicio.opciones_adicionales === 'string') {
            // Lo convertimos de un string a un array real
            ejercicio.opciones_adicionales = JSON.parse(ejercicio.opciones_adicionales);
        }
        // --- FIN DE LA CORRECCIÓN ---

        res.status(200).json(ejercicio);

    } catch (error) {
        console.error("Error al obtener ejercicio aleatorio:", error);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
};