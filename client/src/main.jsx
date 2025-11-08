import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import './media.css'

import { CartProvider } from "./context/CartContext";
import { LoginProvider } from "./context/LoginContext.jsx";
import { AppointmentProvider } from './context/AppointmentContext.jsx';
import { TriggerProvider } from './context/TriggerContext.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <TriggerProvider>
        <CartProvider>
          <LoginProvider>
            <AppointmentProvider>
              <App />
            </AppointmentProvider>
          </LoginProvider>
        </CartProvider>
      </TriggerProvider>
    </BrowserRouter>
  </React.StrictMode>
);


