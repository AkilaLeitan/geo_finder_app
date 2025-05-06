import React, { useEffect } from 'react';
import '../styles/toast.scss';

interface ToastProps {
    type: 'danger' | 'warning' | 'info';
    message: string;
    onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
    useEffect(() => {
        if (type !== 'danger') {
            const timer = setTimeout(onClose, 5000); // Auto-dismiss after 5 seconds
            return () => clearTimeout(timer);
        }
    }, [type, onClose]);

    return (
        <div className={`toast toast-${type}`}>
            <p>{message}</p>
            {type === 'danger' && (
                <button className="toast-close-button" onClick={onClose}>
                    Got it
                </button>
            )}
        </div>
    );
};

export default Toast;