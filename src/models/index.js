import { sequelize } from "../config/database.js";
import { ConceptoGramaticalModel } from "./conceptoGramatical.js";
import { EjercicioModel } from "./ejercicio.js";
import { EstudianteModel } from "./estudiante.js";
import { ProgresoModel } from "./progreso.js";

// Relaciones Concepto ↔ Ejercicio
ConceptoGramaticalModel.hasMany(EjercicioModel, {
  foreignKey: "concepto_id",
  as: "ejercicios",
});
EjercicioModel.belongsTo(ConceptoGramaticalModel, {
  foreignKey: "concepto_id",
  as: "concepto",
});

// Relaciones Ejercicio ↔ Progreso
EjercicioModel.hasMany(ProgresoModel, {
  foreignKey: "ejercicio_id",
  as: "progresos",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ProgresoModel.belongsTo(EjercicioModel, {
  foreignKey: "ejercicio_id",
  as: "ejercicio",
});

// Relaciones Estudiante ↔ Progreso
EstudianteModel.hasMany(ProgresoModel, {
  foreignKey: "estudiante_id",
  as: "progresos",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
ProgresoModel.belongsTo(EstudianteModel, {
  foreignKey: "estudiante_id",
  as: "estudiante",
});

export {
  sequelize,
  ConceptoGramaticalModel,
  EjercicioModel,
  EstudianteModel,
  ProgresoModel,
};
