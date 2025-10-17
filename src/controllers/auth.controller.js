import { UserModel } from "../models/usuario.model.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";


export const register = async (req, res) => {
    const { username, email, password, role } = req.body;
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        const token = generateToken(newUser);
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60,
        });
        return res.status(201).json({
            msg: "Usuario registrado correctamente",
            token,
        });
        return res.status(201).json({ msg: "Usuario registrado correctamente", newUser });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }

};

export const login = async (req, res) => {
    const { email, password } = req.body;

    // 📌 DEBUG: Ver qué datos llegan del frontend
    console.log("📥 Datos recibidos en LOGIN:", req.body);

    try {
        const loginUser = await UserModel.findOne({ email });

        if (!loginUser) {
            console.warn("⚠️ Usuario no encontrado con email:", email);
            return res.status(401).json({ msg: "Usuario no encontrado" });
        }

        console.log("👤 Usuario encontrado:", loginUser.email);

        const validPassword = await comparePassword(password, loginUser.password);

        // 📌 DEBUG: mostrar resultado de comparación
        console.log("🔑 Contraseña ingresada:", password);
        console.log("🔐 Hash guardado:", loginUser.password);
        console.log("✅ ¿Password válida?:", validPassword);

        if (!validPassword) {
            console.warn("⚠️ Contraseña incorrecta para:", email);
            return res.status(401).json({ msg: "Credenciales inválidas" });
        }

        const token = generateToken(loginUser);
        console.log("🎫 Token generado:", token);

        res.cookie("token", token, {
            httpOnly: true, // corregido
            maxAge: 1000 * 60 * 60,
        });

        return res.status(200).json({
            msg: "Usuario logueado correctamente",
            token,
        });
    } catch (error) {
        console.error("Error en login:", error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};


export const getProfile = async (req, res) => {
    try {
        // TODO: devolver profile del user logueado actualmente
        const profile = await UserModel.findOne({ _id: req.user.id });
        return res.status(200).json({ data: profile });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: "Error interno del servidor" });
    }
};


export const logout = async (_req, res) => {
    res.clearCookie("token");
    return res.status(204).json({ msg: "Sesión cerrada correctamente" });
};
