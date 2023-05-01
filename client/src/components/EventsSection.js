import React, { useState, useEffect } from 'react';
import Section from '../components/Section';
import axios from 'axios';
import EventCard from '../components/EventCard';
import '../style/EventsSection.scss';
import one from '../assets/party1.jpg';
import two from '../assets/party2.jpg';
import three from '../assets/party3.jpg';
import four from '../assets/party5.jpg';
import five from '../assets/party6.jpg';
import six from '../assets/party7.jpg';
import seven from '../assets/party4.jpg';
import eight from '../assets/party8.jpg';

const images = [
    one, two, three, four, five, six, seven, eight
];

const EventsSection = () => {
    const title = 'Upcoming Events';
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            const response = await axios.get('/api/events/eventbrite/events/', config);
            setEvents(response.data.event.events);
        } catch (error) {
            console.log(error);
        }
    };

    const eventsList = events.slice(0, 8).map((event, index) => (
        <div className="event-card" key={index}>
            <EventCard event={event} image={images[index % images.length]} />
        </div>
    ));

    const content = <div className="events-section">{eventsList}</div>;

    return (
        <Section
            title={title}
            content={content}
            variant='light'
        ></Section>
    );
};

export default EventsSection;
