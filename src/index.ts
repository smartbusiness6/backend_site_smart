import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import contactRouter from "./routes/contact.route";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/", contactRouter);

// Démarrage
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════╗
║  🚀 Serveur démarré                  ║
║  📍 http://localhost:${PORT}           ║
║  📧 POST /contact                ║
╚══════════════════════════════════════╝
  `);
});

export default app;