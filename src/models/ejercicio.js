import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";
import { ConceptoGramaticalModel } from "./conceptoGramatical.js";

export const EjercicioModel = sequelize.define("Ejercicio", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    texto_pregunta: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    respuesta_correcta: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tipo_ejercicio: {
        type: DataTypes.ENUM("FILL_BLANK", "MC_CHOICE", "KWT", "MATCHING"),
        allowNull: false,
    },
    opciones_adicionales: { type: DataTypes.JSON, allowNull: true },
    concepto_id: {

        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "conceptos_gramaticales", key: "id" },
    },
}, {
    tableName: "ejercicios",
    timestamps: false
});

// Relación N:1
EjercicioModel.belongsTo(ConceptoGramaticalModel, {
    foreignKey: "concepto_id",
    as: "concepto",
});

// Relación 1:N (se completa en index.js con ProgresoModel)
