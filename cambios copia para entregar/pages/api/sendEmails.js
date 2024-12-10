import { connectToEmailsDatabase } from '../../lib/mongodb';
import mg from '../../utils/mailgun';

export default async function handler(req, res) {
  try {
    // Conectar a la BD de correos
    const { db } = await connectToEmailsDatabase();

    // Obtener todos los correos de la colección 'emails'
    const emails = await db.collection('emails').find({}).toArray();
    const recipients = emails.map(e => e.email);

    // Datos del mensaje
    const messageData = {
      from: 'Mailgun Sandbox <postmaster@sandbox13cad9ebe0884edf92eddbbcfd7ac725.mailgun.org>',  // Cambia por un dominio verificado en Mailgun
      to: 'fama.asmad@gmail.com', 
      subject: 'Asunto del Correo',
      text: 'Contenido del correo en texto plano',
      html: '<h1>UNFINISHED</h1><p>Este es un ejemplo.</p>',
    };

    // Envía el correo usando Mailgun
    const response = await mg.messages.create(process.env.MAILGUN_DOMAIN, messageData);

    return res.status(200).json({ message: 'Correos enviados', id: response.id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al enviar correos', error: error.message });
  }
}
