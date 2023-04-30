import React from 'react';
import '../style/AboutPage.scss';
import TeamSection from './TeamSection';

const AboutUs = () => {
    return (
        <main className="about">
            <h2 className="about__title">About Us</h2>
            <p className="about__text">
                Arcade is a fluid template designed to showcase your content with elegance and simplicity. With an emphasis on
                typography and space, Arcade is perfect for photographers, bloggers, and creatives of all kinds.
            </p>
            <TeamSection />
        </main>
    );
};

export default AboutUs;
