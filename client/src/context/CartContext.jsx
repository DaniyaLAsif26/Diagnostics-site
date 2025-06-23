import { createContext, useContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItem, setCartitem] = useState([]);
    const [message, setMessage] = useState('');

    function addToCart(item) {
        setCartitem(prevItems => [...prevItems, item]);
        setMessage('Added to cart');
    }

    function removeFromCart(itemName) {
        setCartitem(prevItems => prevItems.filter(i => i.name !== itemName));
        setMessage('Removed from cart');
    }

    function clearMessage() {
        setMessage('');
    }

    return (
        <CartContext.Provider value={{ cartItem, addToCart, removeFromCart, message, clearMessage }}>
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    return useContext(CartContext);
}
