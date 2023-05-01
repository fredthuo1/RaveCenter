import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventsList from './EventsList';

const Events = () => {
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

    return (
        <EventsList events={events} />
    );
};

export default Events;
