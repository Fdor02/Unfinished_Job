import { MongoClient } from 'mongodb';

// Conexión al cluster principal (inicio de sesión)
const uriDefault = process.env.MONGO_URI;

// Nueva conexión para el cluster de correos electrónicos
const uriEmails = process.env.MONGO_URI_EMAILS;

let clientDefault, clientEmails;
let clientPromiseDefault, clientPromiseEmails;

// Configuración del cliente para el cluster principal
if (!clientDefault) {
    clientDefault = new MongoClient(uriDefault, { useNewUrlParser: true, useUnifiedTopology: true });
    clientPromiseDefault = clientDefault.connect();
}

// Configuración del cliente para el cluster de correos electrónicos
if (!clientEmails) {
    clientEmails = new MongoClient(uriEmails, { useNewUrlParser: true, useUnifiedTopology: true });
    clientPromiseEmails = clientEmails.connect();
}

// Función para conectar al cluster principal
export async function connectToDatabase() {
    await clientPromiseDefault;
    const db = clientDefault.db(); // Utiliza la base de datos especificada en MONGO_URI
    return { db };
}

// Función para conectar al cluster de correos electrónicos
export async function connectToEmailsDatabase() {
    await clientPromiseEmails;
    const db = clientEmails.db(); // Utiliza la base de datos especificada en MONGO_URI_EMAILS
    return { db };
}
