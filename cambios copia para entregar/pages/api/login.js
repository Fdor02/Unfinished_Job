// pages/api/login.js
import bcrypt from 'bcrypt';
import { connectToDatabase } from '../../lib/mongodb';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const { db } = await connectToDatabase();
            const collection = db.collection('users');

            // Busca el usuario en la base de datos
            const user = await collection.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Usuario no encontrado' });
            }

            // Compara la contraseña proporcionada con la almacenada en la base de datos
            const isMatch = await bcrypt.compare(password, user.password);

            if (isMatch) {
                res.status(200).json({ message: 'Inicio de sesión exitoso' });
            } else {
                res.status(401).json({ message: 'Contraseña incorrecta' });
            }
        } catch (error) {
            console.error('Error al autenticar usuario:', error);
            res.status(500).json({ message: 'Error del servidor' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).json({ message: 'Método no permitido' });
    }
}
