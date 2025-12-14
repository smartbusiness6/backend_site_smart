import { Router } from "express";
import { sendContact } from "../controllers/contact.controller";

const contactRouter = Router();

/**
 * POST /contact
 * Envoie un message de contact
 */
contactRouter.post("/contact", sendContact);

export default contactRouter;