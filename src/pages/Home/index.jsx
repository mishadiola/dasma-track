import React from 'react';
import Navbar from '../../components/Navbar';
import Button from '../../components/Button';

const Home = () => {
    return (
        <>
            <header className="header">
                <Navbar />
            </header>
            <main className="home-page">
                <section className="home-page__hero">
                    <h1 className="home-page__title">Welcome to Our Organized React App</h1>
                    <p className="home-page__subtitle">
                        Built with a scalable folder structure and pure CSS architecture.
                    </p>
                    <div style={{ marginTop: '2rem' }}>
                        <Button variant="primary">Get Started</Button>
                        <Button variant="secondary" className="ml-2">Learn More</Button>
                    </div>
                </section>
            </main>
        </>
    );
};

export default Home;
