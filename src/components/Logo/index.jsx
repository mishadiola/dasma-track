import React from 'react';
import logoImg from '../../assets/images/dasmalogo.png';
import './Logo.css';

const Logo = ({ variant = 'default', className = '' }) => {
    return (
        <div className={`system-logo system-logo--${variant} ${className}`}>
            <img src={logoImg} alt="Dasmariñas City Health Office 3 Logo" className="system-logo__image" />
        </div>
    );
};

export default Logo;
