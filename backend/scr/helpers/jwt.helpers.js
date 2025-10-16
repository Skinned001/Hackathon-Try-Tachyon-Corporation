import jwt from "jsonwebtoken";

export const generateToken = (user) => {
    try {
        const token = jwt.sign(
            {
                id: user.id,
                role: user.role,
                // Solo información esencial para autorización
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );
        return token;
    } catch (error) {
        throw new Error("Error al generar el token: " + error.message);
    }
};

export const validateToken = (token) => {
    try {
        const generatedToken = jwt.verify(token, process.env.JWT_SECRET);
        return generatedToken;
    } catch (error) {
        throw new Error("Error al verificar el token " + error);
    }
};