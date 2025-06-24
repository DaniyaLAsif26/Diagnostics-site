import { useEffect } from 'react';
import { useCart } from '../../context/CartContext';

export default function CartMessage() {
    const { message, clearMessage } = useCart();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => clearMessage(), 3000);
            return () => clearTimeout(timer);
        }
    }, [message, clearMessage]);

    if (!message) return null;
    return (
        <div className="flash-cont">
            <div className="global-flash">
                <div className="flash-msg">
                    {message}
                </div>
                <div className="flash-border"></div>
            </div>
        </div>
    );
}
