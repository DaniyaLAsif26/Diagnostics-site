import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartMessage() {
    const { message, clearMessage } = useCart();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => clearMessage(), 3500);
            return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    if (!message) return null;
    return (
        <div className="global-flash">
            {message}
        </div>
    );
}
