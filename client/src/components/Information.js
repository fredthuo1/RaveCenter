import React from 'react';
import Section from '../components/Section';
import '../style/Information.scss';

const Information = () => {

    const title = "Who are we!"
    const content = "Welcome to our website that helps users find events in any town they are in! With our user-friendly interface, you can easily browse and filter events by date, location, and category. We gather information from various sources to ensure that you are up-to-date with the latest events in your area. Our website is designed to help you make the most of your free time, and discover new and exciting experiences in your community.";

    return (
        <div className="information">
            <Section title={title} content={content} variant="dark" />
            <button className="information__button" onClick={() => window.location.href = '/aboutUs'} >Learn More About Us</button>
        </div>
    );
};

export default Information;
