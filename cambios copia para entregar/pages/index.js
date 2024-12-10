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

    const [countdown, setCountdown] = useState(null);
    const [showEmailSection, setShowEmailSection] = useState(false);
    const [showProducts, setShowProducts] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [email, setEmail] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    // Obtener el tiempo restante del servidor
    useEffect(() => {
        async function fetchTimer() {
            const res = await fetch('/api/timer');
            const data = await res.json();
            setCountdown(Math.ceil(data.remainingTime / 1000)); // Convertir milisegundos a segundos
        }
        fetchTimer();
    }, []);

    // Iniciar la cuenta regresiva
    useEffect(() => {
        if (countdown === 0) {
            setShowProducts(true);
            setShowEmailSection(false);
        } else if (countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [countdown]);

    // Cambio de idioma
    const changeLanguage = () => {
        const newLang = i18n.language === 'en' ? 'es' : 'en';
        i18n.changeLanguage(newLang);
    };

    // Mostrar/ocultar sección de email
    const toggleEmailSection = () => {
        setShowEmailSection(!showEmailSection);
    };

    // Manejar envío de email
    const handleSubmitEmail = async () => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailMessage(t('invalid_email'));
            return;
        }
        try {
            const response = await fetch('/api/emails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setEmailMessage(t('email_registered'));
            } else {
                setEmailMessage(data.message || t('error_occurred'));
            }
        } catch (error) {
            setEmailMessage(t('connection_error'));
        }
    };

    // Manejar inicio de sesión
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
                setMessage(t('login_success'));
            } else {
                setMessage(data.message || t('login_error'));
            }
        } catch (error) {
            setMessage(t('connection_error'));
        }
    };

    // Integración con Shopify
    useEffect(() => {
        if (showProducts) {
            const scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';

            function loadScript() {
                const script = document.createElement('script');
                script.async = true;
                script.src = scriptURL;
                script.onload = ShopifyBuyInit;
                document.head.appendChild(script);
            }

            function ShopifyBuyInit() {
                const client = ShopifyBuy.buildClient({
                    domain: 'nsq1ew-fb.myshopify.com',
                    storefrontAccessToken: '4f4f0cef418479d8b9f1cd968fa9ff51',
                });

                ShopifyBuy.UI.onReady(client).then(function (ui) {
                    ui.createComponent('collection', {
                        id: '288715472970',
                        node: document.getElementById('collection-component'),
                        moneyFormat: '%24%7B%7Bamount_no_decimals%7D%7D',
                        product: {
                            text: {
                                button: t('ADD_TO_CART'),
                                outOfStock: t('OUT_OF_STOCK')
                            },
                            styles: {
                                product: {
                                    'margin': '10px',
                                    'text-align': 'left',
                                },
                            },
                        },
                    });
                    
                });
            }

            if (window.ShopifyBuy) {
                if (window.ShopifyBuy.UI) {
                    ShopifyBuyInit();
                } else {
                    loadScript();
                }
            } else {
                loadScript();
            }
        }
    }, [showProducts]);

    return (
        <div>
            {/* Botón de login */}
            <button id="login-button" className="btn btn-danger" onClick={() => document.getElementById('loginModal').style.display = 'block'}>
                {t('login')}
            </button>

            <div className="container text-center">
                {/* Logo */}
                <div id="logo" className={countdown === 0 ? 'small' : 'large'}>Unfinished</div>

                {/* Temporizador */}
                {countdown !== null && countdown > 0 && (
                    <div id="timer">{`00:${countdown < 10 ? '0' : ''}${countdown}`}</div>
                )}

                {/* Botón para email */}
                {countdown > 0 && !showProducts && (
                    <button id="show-email" className="btn btn-danger" onClick={toggleEmailSection}>
                        {t('enter_email')}
                    </button>
                )}

                {/* Sección de email */}
                {showEmailSection && (
                    <div id="email-section">
                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder={t('enter_your_email')}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button id="submit-email" className="btn btn-danger" onClick={handleSubmitEmail}>
                            {t('submit')}
                        </button>
                        {emailMessage && (
                            <p className={emailMessage === t('email_registered') ? 'success-message' : 'error-message'}>
                                {emailMessage}
                            </p>
                        )}
                    </div>
                )}

                {/* Productos de Shopify */}
                {showProducts && (
                    <div id="collection-component"></div>
                )}

                {/* Botón de traducción */}
                <button id="translate-button" className="translate-button" onClick={changeLanguage}>
                    {i18n.language === 'en' ? 'ES' : 'EN'}
                </button>
            </div>

            {/* Modal de inicio de sesión */}
            <div className="modal fade" id="loginModal" tabIndex="-1" aria-labelledby="loginModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button
                                type="button"
                                className="close"
                                onClick={() => document.getElementById('loginModal').style.display = 'none'}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleLogin}>
                                <div className="form-group">
                                    <label htmlFor="username">{t('username')}</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        placeholder={t('enter_username')}
                                    />
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
                                >
                                    {t('join_the_club')}
                                </button>
                            </form>
                            {message && (
                                <p className={message.includes(t('login_success')) ? 'success-message' : 'error-message'}>
                                    {message}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
