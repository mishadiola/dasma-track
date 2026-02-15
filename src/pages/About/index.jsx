import React from 'react';
import Navbar from '../../components/Navbar';

const About = () => {
    return (
        <>
            <header className="header">
                <Navbar />
            </header>
            <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h1>About Us</h1>
                <p>This page demonstrates the routing capability and component reuse.</p>
            </main>
        </>
    );
};

export default About;
