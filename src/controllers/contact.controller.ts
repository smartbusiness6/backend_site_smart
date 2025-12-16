import { Request, Response } from "express";
import { sendContactEmail } from "../services/email.service";

/**
 * Envoie un message de contact
 * POST /contact
 */
export const sendContact = async (req: Request, res: Response) => {
  try {
    const { email, name, subject, text, phone } = req.body;

    // Validation
    if (!email || !text) {
      return res.status(400).json({
        success: false,
        message: "Email et message requis",
      });
    }

    // Validation email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Email invalide",
      });
    }

    // Validation longueur
    if (text.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Le message doit contenir au moins 10 caractères",
      });
    }

    // Envoi de l'email
    await sendContactEmail({ email, name, subject, text, phone });

    return res.status(200).json({
      success: true,
      message: "Message envoyé avec succès",
    });
  } catch (error) {
    console.error("Erreur:", error);
    return res.status(500).json({
      success: false,
      message: "Erreur lors de l'envoi",
      error: error instanceof Error ? error.message : "Erreur inconnue",
    });
  }
};