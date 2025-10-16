import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const ProgresoModel = sequelize.define("Progreso", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  respuesta_dada: {
    type: DataTypes.TEXT,
  },
  es_correcto: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  fecha_respuesta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  estudiante_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  ejercicio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "progreso",
  timestamps: false,
});
