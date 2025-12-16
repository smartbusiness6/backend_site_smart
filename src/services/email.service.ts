import nodemailer from "nodemailer";

interface ContactMessage {
  email: string;
  name?: string;
  subject?: string;
  text: string;
  phone?: string;
}

/**
 * Envoie un email de contact depuis le site web
 */
export const sendContactEmail = async (data: ContactMessage): Promise<void> => {
  try {
    // Configuration du transporteur
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Destinataire (votre email)
    const recipientEmail = process.env.MAIL_CONTACT;

    // Contenu de l'email
    const mailOptions = {
      from: `"${process.env.APP_NAME || "Site Web"}" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      replyTo: data.email,
      subject: data.subject || "Nouveau message depuis le site web",
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
              .content { background: #f9f9f9; padding: 20px; }
              .info { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #4CAF50; }
              .message { background: white; padding: 20px; margin: 20px 0; white-space: pre-wrap; }
              .footer { text-align: center; color: #999; font-size: 12px; margin-top: 20px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h2>📧 Nouveau message de contact</h2>
              </div>
              <div class="content">
                <div class="info">
                  <p><strong>De:</strong> ${data.name || "Non spécifié"}</p>
                  <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
                  ${data.phone ? `<p><strong>Téléphone:</strong> ${data.phone}</p>` : ""}
                  ${data.subject ? `<p><strong>Sujet:</strong> ${data.subject}</p>` : ""}
                </div>
                <div class="message">
                  <strong>Message:</strong><br><br>
                  ${data.text}
                </div>
                <p style="color: #666; font-size: 14px;">
                  💡 Répondez directement à cet email pour contacter ${data.name || "l'expéditeur"}
                </p>
              </div>
              <div class="footer">
                <p>${process.env.APP_NAME || "Site Web"} - ${new Date().toLocaleString("fr-FR")}</p>
              </div>
            </div>
          </body>
        </html>
      `,
    };

    // Envoi de l'email
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("❌ Erreur envoi email:", error);
    throw new Error(
      `Échec de l'envoi: ${error instanceof Error ? error.message : "Erreur inconnue"}`
    );
  }
};