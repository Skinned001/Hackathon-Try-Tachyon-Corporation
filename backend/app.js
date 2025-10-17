import express from "express";
import "dotenv/config";
import { connectDB } from "./src/config/database.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Router } from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT;

app.use(
  cors({
    origin: ["http://127.0.0.1:5500", "http://localhost:5000"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use("/api", Router);

// app.use("/api", routes)

app.listen(PORT, async () => {
  try {
    connectDB();
    console.log(`Servidor encendido y corriendo en https://localhost:${PORT}`);
  } catch (error) {
    console.log("Error al encender el servidor" + error);
  }
});
