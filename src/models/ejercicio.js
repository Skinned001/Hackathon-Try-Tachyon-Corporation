import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const EjercicioModel = sequelize.define('Ejercicio', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    texto_pregunta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    respuesta_correcta: {
        type: DataTypes.STRING,
        allowNull: false // La clave para la autoevaluación
    },
    tipo_ejercicio: {
        type: DataTypes.ENUM('FILL_BLANK', 'MC_CHOICE', 'KWT', 'MATCHING'), // Tipos de autoevaluación
        allowNull: false
    },
    opciones_adicionales: {
        type: DataTypes.JSON, // Para almacenar los distractores (opciones incorrectas) en MC_CHOICE
        allowNull: true
    },
    // Clave foránea al Concepto Gramatical
    concepto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'conceptos_gramaticales', // Asegúrate de que este nombre de tabla sea correcto
            key: 'id'
        }
    }
}, {
    tableName: 'ejercicios'
});

// Un Ejercicio pertenece a un solo Concepto Gramatical (Relación N a 1)
EjercicioModel.belongsTo(ConceptoGramaticalModel, {
    foreignKey: 'concepto_id',
    as: 'concepto'
});

// Un Ejercicio puede tener muchos registros de Progreso (Relación 1 a N)
EjercicioModel.hasMany(ProgresoModel, {
    foreignKey: 'ejercicio_id',
    as: 'progresos'
});