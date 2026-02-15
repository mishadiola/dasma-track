import React from 'react';

const Button = ({ children, variant = 'primary', onClick, className = '' }) => {
    return (
        <button
            className={`button button--${variant} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
