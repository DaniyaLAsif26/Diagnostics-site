// TriggerContext.js
import { createContext, useState, useContext, useEffect, useRef, useCallback } from "react";

const TriggerContext = createContext();

export const TriggerProvider = ({ children }) => {
    const [dataChanged, setDataChanged] = useState(0); // Use number instead of boolean for better tracking
    const channelRef = useRef(null);
    const mountedRef = useRef(true);

    useEffect(() => {
        mountedRef.current = true;

        // Check if BroadcastChannel is supported
        if (typeof BroadcastChannel === 'undefined') {
            console.warn('BroadcastChannel not supported in this browser');
            return;
        }

        try {
            channelRef.current = new BroadcastChannel('app-sync-channel');
            
            channelRef.current.onmessage = (event) => {
                if (!mountedRef.current) return;
                
                const { type, timestamp } = event.data || {};
                if (type === 'DATA_UPDATED' || type === 'USER_UPDATED') {
                    console.log("🔁 Received event from another tab:", type, timestamp);
                    setDataChanged(prev => prev + 1);
                    
                    // Dispatch custom event for components that need it
                    window.dispatchEvent(new CustomEvent(type, { detail: { timestamp } }));
                }
            };

            channelRef.current.onerror = (error) => {
                console.error('BroadcastChannel error:', error);
            };

        } catch (error) {
            console.error('Failed to create BroadcastChannel:', error);
        }

        return () => {
            mountedRef.current = false;
            if (channelRef.current) {
                try {
                    channelRef.current.close();
                } catch (error) {
                    console.error('Error closing BroadcastChannel:', error);
                }
                channelRef.current = null;
            }
        };
    }, []);

    const triggerDataUpdate = useCallback((eventType = 'DATA_UPDATED') => {
        if (!mountedRef.current) return;
        
        setDataChanged(prev => prev + 1);
        
        if (channelRef.current) {
            try {
                channelRef.current.postMessage({ 
                    type: eventType, 
                    timestamp: Date.now() 
                });
            } catch (error) {
                console.error('Failed to broadcast message:', error);
            }
        }
    }, []);

    return (
        <TriggerContext.Provider value={{ dataChanged, triggerDataUpdate }}>
            {children}
        </TriggerContext.Provider>
    );
};

export const useTrigger = () => {
    const context = useContext(TriggerContext);
    if (!context) {
        throw new Error('useTrigger must be used within a TriggerProvider');
    }
    return context;
};