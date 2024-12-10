let timerStart = Date.now(); // Marca de tiempo inicial al iniciar el servidor
const TIMER_DURATION = 7 * 1000; // 30 segundos en milisegundos

export default function handler(req, res) {
    if (req.method === 'GET') {
        const now = Date.now();
        const elapsedTime = now - timerStart;
        const remainingTime = Math.max(TIMER_DURATION - elapsedTime, 0); // Tiempo restante
        res.status(200).json({ remainingTime });
    } else if (req.method === 'POST') {
        // Reiniciar el temporizador manualmente si se recibe una solicitud POST
        timerStart = Date.now();
        res.status(200).json({ message: 'Timer restarted' });
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
