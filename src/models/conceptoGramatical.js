import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ConceptoGramaticalModel = sequelize.define(
    "ConceptoGramatical",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nombre: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true, // Ejemplo: “Present Simple”, “Past Perfect”
        },
        nivel_mcer: {
            type: DataTypes.ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
            allowNull: false,
            comment: "Nivel MCER (Marco Común Europeo de Referencia)",
        },
        explicacion: {
            type: DataTypes.TEXT,
            allowNull: true,
            comment: "Descripción o regla del concepto gramatical",
        },
    },
    {
        tableName: "conceptos_gramaticales",
        timestamps: false,
        engine: "InnoDB", // asegura compatibilidad con claves foráneas
    }
);
