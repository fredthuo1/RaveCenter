import React, { useContext } from 'react';
import UserContext from '../UserContext';
import EventsSection from './EventsSection';
import Hero from './Hero';
import Information from './Information';
import '../style/HomePage.scss';

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <main className="home-page">
            <Hero />
            <Information />
            <EventsSection />
        </main>
    );
};

export default HomePage;
