import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const EstudianteModel = sequelize.define(
  "Estudiante",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nivel_actual: {
      // Usamos el Marco Común Europeo de Referencia (MCER)
      type: DataTypes.ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
      defaultValue: "A1",
      allowNull: false,
    },
  },
  {
    tableName: "estudiantes",
  },
  {
    paranoid: true,
  }
);

Estudiante.associate = function (models) {
  // Un estudiante tiene muchos registros de Progreso
  Estudiante.hasMany(models.Progreso, {
    foreignKey: "estudiante_id",
    as: "progresos",
  });
};

return Estudiante;
