import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { connectToDatabase } from '../../lib/mongodb';  

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        try {
            const { db } = await connectToDatabase(); // Conecta a la base de datos

            // Buscar el usuario en la base de datos
            const user = await db.collection('users').findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Credenciales inválidas' });
            }

            // Verificar la contraseña
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
                res.status(200).json({ token });
            } else {
                res.status(401).json({ message: 'Credenciales inválidas' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error al iniciar sesión', error });
        }
    } else {
        res.status(405).json({ message: 'Método no permitido' });
    }
}
