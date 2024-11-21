export const reminderEmail = (email) => ({
    from: "Tu Nombre <tu@dominio.com>",
    to: email,
    subject: "Recordatorio pendiente",
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.5; text-align: center;">
        <img src="https://tu-dominio.com/images/logo.png" alt="Logo" style="width: 150px; margin-bottom: 20px;">
        <h1 style="color: #0056b3;">¡Hola!</h1>
        <p>Este es un recordatorio para completar tu registro en nuestra plataforma.</p>
        <p>Haz clic en el siguiente enlace para terminar tu registro:</p>
        <a href="https://tu-sitio.com/completar-registro" style="color: #0056b3; text-decoration: none; font-weight: bold;">Completar registro</a>
        <p style="margin-top: 20px;">Gracias,<br>El equipo de Tu Nombre</p>
      </div>
    `,
  });
  