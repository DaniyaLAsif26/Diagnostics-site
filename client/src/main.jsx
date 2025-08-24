import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { CartProvider } from "./context/CartContext";
import { LoginProvider } from "./context/LoginContext.jsx";

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
        <CartProvider>
          <LoginProvider>
            <App />
          </LoginProvider>
        </CartProvider>
    </BrowserRouter>
  </React.StrictMode >
);

