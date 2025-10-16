import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ConceptoGramaticalModel = sequelize.define('ConceptoGramatical', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true // Los nombres de conceptos deben ser únicos (ej: 'Present Simple')
    },
    nivel_mcjer: {
        type: DataTypes.ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2'),
        allowNull: false
    },
    explicacion: {
        type: DataTypes.TEXT,
        allowNull: true // Puede ser una breve ayuda o regla
    }
}, {
    tableName: 'conceptos_gramaticales'
});

// Un Concepto Gramatical tiene muchos Ejercicios (Relación 1 a N)
ConceptoGramaticalModel.hasMany(EjercicioModel, {
    foreignKey: 'concepto_id',
    as: 'ejercicios'
});