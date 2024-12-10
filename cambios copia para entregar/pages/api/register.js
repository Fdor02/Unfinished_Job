// pages/api/register.js
import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const { db } = await connectToDatabase();
            const collection = db.collection('users');

            // Verifica si el usuario ya existe
            const existingUser = await collection.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Usuario ya registrado' });
            }

            // Genera un hash de la contraseña
            const hashedPassword = await bcrypt.hash(password, 10); // 10 es el valor recomendado para "saltRounds"

            // Guarda el usuario con la contraseña encriptada en la base de datos
            await collection.insertOne({ username, password: hashedPassword });

            res.status(201).json({ message: 'Registro exitoso' });
        } catch (error) {
            console.error('Error al registrar usuario:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Método ${req.method} no permitido`);
    }
}
