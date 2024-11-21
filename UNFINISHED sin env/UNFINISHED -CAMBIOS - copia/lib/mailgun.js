import mailgun from "mailgun-js";

const DOMAIN = process.env.MAILGUN_DOMAIN;
const API_KEY = process.env.MAILGUN_API_KEY;

console.log("DEBUG: MAILGUN_DOMAIN =", DOMAIN);
console.log("DEBUG: MAILGUN_API_KEY =", API_KEY);

if (!DOMAIN) {
  throw new Error("MAILGUN_DOMAIN no está configurado. Asegúrate de definirlo en tu archivo .env.local.");
}
if (!API_KEY) {
  throw new Error("MAILGUN_API_KEY no está configurado. Asegúrate de definirlo en tu archivo .env.local.");
}

const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });

export const sendEmail = async (data) => {
  try {
    const response = await mg.messages().send(data);
    return response;
  } catch (error) {
    throw new Error(`Error enviando correo: ${error.message}`);
  }
};
