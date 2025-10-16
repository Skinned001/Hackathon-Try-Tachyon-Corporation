import { validateToken } from "../helpers/jwt.helper.js";

export const authMiddleware = (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json("No autenticado");
        }
        const decoded = validateToken(token);
        req.userLogged = decoded;
        console.log(decoded);
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json("Error al autenticar " + error);
    }
};