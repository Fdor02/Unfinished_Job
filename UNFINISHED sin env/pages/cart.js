import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CartPage() {
    const { t } = useTranslation();
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(savedCart);
    }, []);

    const removeFromCart = (index) => {
        const updatedCart = cart.filter((_, i) => i !== index);
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    return (
        <div className="container text-center">
            <h2>{t('your cart')}</h2>
            <div id="cart-items">
                {cart.length === 0 ? (
                    <p>{t('no items')}</p>
                ) : (
                    cart.map((item, index) => (
                        <div key={index} className="cart-item">
                            <span>{item}</span>
                            <button className="btn btn-danger" onClick={() => removeFromCart(index)}>
                                Remove
                            </button>
                        </div>
                    ))
                )}
            </div>
            <Link href="/">
                <button className="btn btn-danger mt-3">{t('back to products')}</button>
            </Link>
        </div>
    );
}