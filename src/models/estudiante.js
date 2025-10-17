import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const EstudianteModel = sequelize.define("Estudiante", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true, autoIncrement: true
    },
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
        type: DataTypes.ENUM("A1", "A2", "B1", "B2", "C1", "C2"),
        defaultValue: "A1",
        allowNull: false,
    },
}, {
    tableName: "estudiantes",
    paranoid: true,
});
