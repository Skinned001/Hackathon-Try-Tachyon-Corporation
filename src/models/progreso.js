import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { EjercicioModel } from "./ejercicio.js";

export const ProgresoModel = sequelize.define('Progreso', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    respuesta_dada: { type: DataTypes.TEXT },
    es_correcto: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    fecha_respuesta: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    estudiante_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'estudiantes', key: 'id' }
    },
    ejercicio_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'ejercicios', key: 'id' }
    }
}, {
    tableName: 'progreso'
});


    ProgresoModel.belongsTo(EjercicioModel, {
        foreignKey: 'ejercicio_id',
        as: 'ejercicio'
    });

// --- Definiendo las relaciones ---


// Un Progreso pertenece a un Ejercicio (N a 1)
ProgresoModel.belongsTo(EjercicioModel, {
    foreignKey: 'ejercicio_id',
    as: 'ejercicio'
});