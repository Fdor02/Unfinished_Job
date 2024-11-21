import mongoose from "mongoose";
import { sendEmail } from "../../lib/mailgun";
import { reminderEmail } from "../../lib/emailTemplates";

// Definir el esquema de la colección
const unfinishedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true },
});
const UnfinishedEmail = mongoose.models.unfinishedemail || mongoose.model("unfinishedemail", unfinishedEmailSchema);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Conectar a la base de datos si es necesario
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_EMAILS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    }

    // Obtener correos pendientes
    const emails = await UnfinishedEmail.find();
    if (emails.length === 0) {
      return res.status(200).json({ message: "No hay correos pendientes para enviar." });
    }

    // Enviar correos
    const results = [];
    for (const { email } of emails) {
      const data = reminderEmail(email);

      try {
        const response = await sendEmail(data);
        results.push({ email, status: "success", response });
      } catch (error) {
        results.push({ email, status: "error", error: error.message });
      }
    }

    // Responder con los resultados del envío
    return res.status(200).json({ message: "Correos procesados.", results });
  } catch (error) {
    console.error("Error en el envío de correos:", error);
    return res.status(500).json({ error: "Error interno del servidor" });
  } finally {
    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }
  }
}
