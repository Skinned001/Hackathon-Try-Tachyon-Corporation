import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { ProgresoModel } from "./progreso.js";

export const EstudianteModel = sequelize.define('Estudiante', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    nivel_actual: {
        type: DataTypes.ENUM('A1', 'A2', 'B1', 'B2', 'C1', 'C2'),
        defaultValue: 'A1',
        allowNull: false
    }
}, {
    tableName: 'estudiantes',
    paranoid: true
});


// Un Estudiante tiene muchos registros de Progreso (Relación 1 a N)
EstudianteModel.hasMany(ProgresoModel, {
    foreignKey: 'estudiante_id',
    as: 'progresos'
});