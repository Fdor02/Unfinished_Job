import mongoose from "mongoose";
import { sendEmail } from "../lib/mailgun.js";
import { reminderEmail } from "../lib/emailTemplates.js";
import winston from "winston";
import 'dotenv/config';

// Configuración de Winston para logs
const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(
      (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // Mostrar logs en la consola
    new winston.transports.File({ filename: "sendEmails.log" }), // Guardar logs en un archivo
  ],
});

// Definición del esquema de la colección
const unfinishedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true }, // Cada documento debe tener un campo "email"
});
const UnfinishedEmail = mongoose.model("unfinishedemail", unfinishedEmailSchema);

// Script para enviar correos
async function sendEmails() {
  try {
    // Conectar a la base de datos si es necesario
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI_EMAILS, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      logger.info("Conexión a MongoDB establecida.");
    }

    // Obtener todos los correos pendientes
    const emails = await UnfinishedEmail.find();

    if (emails.length === 0) {
      logger.info("No hay correos pendientes para enviar.");
      return;
    }

    logger.info(`Se encontraron ${emails.length} correos pendientes.`);

    // Enviar correos iterando por cada email
    for (const { email } of emails) {
      const data = reminderEmail(email);

      try {
        const response = await sendEmail(data);
        logger.info(`Correo enviado exitosamente a: ${email}`);
      } catch (error) {
        logger.error(`Error enviando correo a ${email}: ${error.message}`);
      }
    }

    logger.info("Todos los correos han sido procesados.");
  } catch (err) {
    logger.error(`Error general en el envío de correos: ${err.message}`);
  } finally {
    // Cerrar la conexión a MongoDB
    await mongoose.connection.close();
    logger.info("Conexión a MongoDB cerrada.");
  }
}

// Ejecutar el script
sendEmails();
