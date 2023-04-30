import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventsList from './EventsList';
import '../style/Dashboard.scss';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/add-event');
    }

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('/api/events/eventbrite/events/');
            setEvents(response.data.event.events);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="container">
            <h2>Events Dashboard</h2>
            <button className="add-event-btn" onClick={handleClick}>Add Event</button>
            <EventsList events={events} />
        </div>
    );
};

export default Dashboard;
