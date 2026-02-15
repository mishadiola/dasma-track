import React from 'react';

const Navbar = () => {
    return (
        <nav className="navbar">
            <a href="/" className="navbar__brand">My App</a>
            <div className="navbar__menu">
                <a href="/" className="navbar__link">Home</a>
                <a href="/about" className="navbar__link">About</a>
            </div>
        </nav>
    );
};

export default Navbar;
