import { createContext, useContext, useState, useEffect } from "react";

export const CartContext = createContext();

const CART_KEY = "cart_v1";
const TTL_7_DAYS = 7 * 24 * 60 * 60 * 1000; // 7 days in ms

// Helpers
function setWithExpiry(key, value, ttl = TTL_7_DAYS) {
    const now = Date.now();
    const item = { value, expiry: now + ttl };
    localStorage.setItem(key, JSON.stringify(item));
}

function getWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return null;

    try {
        const item = JSON.parse(itemStr);
        if (Date.now() > item.expiry) {
            localStorage.removeItem(key);
            return null;
        }
        return item.value;
    } catch {
        localStorage.removeItem(key);
        return null;
    }
}

export const CartProvider = ({ children }) => {
    // Load cart from localStorage initially
    const [cartItem, setCartitem] = useState(() => {
        const saved = getWithExpiry(CART_KEY);
        return saved ? saved : [];
    });

    const [message, setMessage] = useState("");
    const [subtotal, setSubtotal] = useState(0);

    // Sync cart to localStorage on change
    useEffect(() => {
        setWithExpiry(CART_KEY, cartItem, TTL_7_DAYS);
    }, [cartItem]);

    function addToCart(item) {
        setCartitem((prevItems) => [...prevItems, item]);
        setMessage("Added to cart");
    }

    function removeFromCart(itemName) {
        setCartitem((prevItems) => prevItems.filter((i) => i.name !== itemName));
        setMessage("Removed from cart");
    }

    function setCartSubtotal(no) {
        setSubtotal(no);
    }

    function clearMessage() {
        setMessage("");
    }

    const clearCart = () => {
        setCartitem([])
        try {
            localStorage.removeItem(CART_KEY);
            // sessionStorage.removeItem('cart_v1');
        } catch (error) {
            console.warn('Failed to clear appointment data:', error);
        }
    }

    useEffect(() => {
        if (cartItem && cartItem.length > 0) {
            const subtotal = cartItem.reduce((total, item) => total + Number(item.price), 0);
            setCartSubtotal(subtotal);
        } else {
            setCartSubtotal(0);
        }
    }, [cartItem, setCartSubtotal]);

    return (
        <CartContext.Provider
            value={{
                cartItem,
                addToCart,
                removeFromCart,
                setCartSubtotal,
                subtotal,
                message,
                clearMessage,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export function useCart() {
    return useContext(CartContext);
}
