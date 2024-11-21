import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';

export default function RegisterPage() {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario registrado correctamente",
                    showConfirmButton: false,
                    timer: 1500
                });
                setTimeout(() => {
                    router.push('/es'); // Redirige después de mostrar el SweetAlert
                }, 1500);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error en el registro",
                    text: data.message || "Algo salió mal",
                });
            }
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error de conexión",
                text: "No se pudo completar el registro. Intente más tarde.",
            });
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
        </div>
    );
}
