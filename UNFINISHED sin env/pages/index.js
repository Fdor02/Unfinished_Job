import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export async function getStaticProps({ locale }) {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common'])),
        },
    };
}

export default function HomePage() {
    const { t, i18n } = useTranslation();
    const router = useRouter();

    const [cart, setCart] = useState([]);
    const [countdown, setCountdown] = useState(5); 
    const [showEmailSection, setShowEmailSection] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (countdown === 0) {
            setShowProducts(true);
        }
    }, [countdown]);

    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    const addToCart = (product) => {
        const updatedCart = [...cart, product];
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
        document.getElementById('cart').style.display = 'block';
    };

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const toggleEmailSection = () => {
        setShowEmailSection(!showEmailSection);
    };

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    // Función para manejar el inicio de sesión
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                setMessage('Inicio de sesión exitoso');
                
            } else {
                setMessage(data.message || 'Error en el inicio de sesión');
            }
        } catch (error) {
            setMessage('Error de conexión');
        }
    };

    return (
        <div>
            {/* Carrito y botón de login */}
            <div id="cart" style={{ marginRight: '10px', cursor: 'pointer', display: cart.length > 0 ? 'block' : 'none' }} onClick={() => setShowCart(true)}>
                {t('cart')} (<span id="cart-count">{cart.length}</span>)
            </div>
            <button id="login-button" className="btn btn-danger" onClick={() => document.getElementById('loginModal').style.display = 'block'} style={{ top: '80px' }}>{t('login')}</button>

            {!showCart ? (
                <div className="container text-center">
                    {/* Logo */}
                    <div id="logo" className={countdown === 0 ? 'small' : 'large'}>Unfinished</div>
                    
                    {/* Temporizador */}
                    {countdown > 0 && !showProducts && <div id="timer">{`00:${countdown < 10 ? '0' : ''}${countdown}`}</div>}

                    {/* Botón para mostrar sección de email */}
                    {countdown > 0 && !showProducts && (
                        <button id="show-email" className="btn btn-danger" onClick={toggleEmailSection}>
                            {t('enter_email')}
                        </button>
                    )}

                    {showEmailSection && (
                        <div id="email-section" className="mt-4">
                            <input
                                type="email"
                                id="email"
                                className="form-control d-inline-block"
                                placeholder={t('enter_your_email')}
                            />
                            <button
                                id="submit-email"
                                className="btn btn-danger"
                                onClick={() => alert('Email submitted')}
                            >
                                {t('submit')}
                            </button>
                        </div>
                    )}

                    <div id="products" className="product-grid" style={{ display: showProducts ? 'grid' : 'none' }}>
                        {['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5', 'Product 6'].map((product) => (
                            <div key={product} className="product" data-product={product}>
                                {product}
                                <button className="add-to-cart" onClick={() => addToCart(product)}>+</button>
                            </div>
                        ))}
                    </div>

                    <button
                        id="translate-button"
                        style={{
                            position: 'fixed',
                            bottom: '20px',
                            right: '20px',
                            padding: '10px 15px',
                            fontSize: '16px',
                            cursor: 'pointer',
                        }}
                        onClick={changeLanguage}
                    >
                        {i18n.language === 'en' ? 'ES' : 'EN'}
                    </button>
                </div>
            ) : (
                <div id="cart-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'transparent', padding: '20px', borderRadius: '10px', maxWidth: '400px', margin: '20px auto', color: '#ffffff' }}>
                    <h2>{t('your_cart')}</h2>
                    <div id="cart-items">
                        {cart.length === 0 ? (
                            <p>{t('no_items')}</p>
                        ) : (
                            cart.map((item, index) => (
                                <div key={index} className="cart-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'transparent', padding: '10px', marginBottom: '10px', borderRadius: '5px', width: '100%', fontSize: '18px' }}>
                                    <span>{item}</span>
                                    <button className="remove-from-cart" style={{ backgroundColor: '#ffffff', color: '#000000', border: 'none', borderRadius: '5px', padding: '5px 10px', cursor: 'pointer', fontSize: '16px', transition: 'background-color 0.3s' }} onClick={() => removeFromCart(index)}>
                                        {t('remove')}
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                    <button id="back-to-products" onClick={() => setShowCart(false)} className="btn btn-secondary" style={{ backgroundColor: '#4CAF50', color: '#ffffff', border: 'none', borderRadius: '5px', padding: '10px 20px', fontSize: '16px', cursor: 'pointer', textAlign: 'center', marginTop: '20px', transition: 'background-color 0.3s', width: '100%' }}>
                        {t('back_to_products')}
                    </button>
                </div>
            )}

            {/* Modal de inicio de sesión y registro */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" onClick={() => document.getElementById('loginModal').style.display = 'none'} aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">{t('username')}</label>
                                    <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder={t('enter_username')} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">{t('password')}</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                        placeholder={t('enter_password')} 
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary">
                                    {t('login')}
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    id="join-club-button" 
                                    onClick={() => router.push('/register')} 
                                    style={{ marginLeft: '10px' }}
                                >
                                    {t('join_the_club')}
                                </button>
                            </form>
                            {message && <p style={{ marginTop: '10px', color: message.includes('exitoso') ? 'green' : 'red' }}>{message}</p>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
