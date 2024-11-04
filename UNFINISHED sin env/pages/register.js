import { useState } from 'react';
import { useRouter } from 'next/router';

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleRegister = async () => {
        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Usuario registrado correctamente');
                router.push('/es'); // Redirige a /es después del registro
            } else {
                setMessage(data.message || 'Error en el registro');
            }
        } catch (error) {
            setMessage('Error de conexión');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
            <h2>Join the Club</h2>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <button
                onClick={handleRegister}
                style={{ width: '100%', padding: '10px', cursor: 'pointer', backgroundColor: '#4CAF50', color: '#fff', border: 'none', borderRadius: '5px' }}
            >
                Register
            </button>
            {message && <p style={{ marginTop: '10px', color: message.includes('correctamente') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}
