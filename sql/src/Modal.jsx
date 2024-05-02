import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div style={styles.backdrop}>
            <div style={styles.modal}>
                <button style={styles.closeButton} onClick={onClose}>Close</button>
                {children}
            </div>
        </div>
    );
};

const styles = {
    backdrop: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
    },
    modal: {
        position: 'relative',
        background: '#fff',
        borderRadius: '8px',
        padding: '20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        minWidth: '300px',
        zIndex: 1001,
    },
    closeButton: {
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'transparent',
        border: 'none',
        fontSize: '16px',
        cursor: 'pointer',
        color: 'black',
    }
};

export default Modal;
