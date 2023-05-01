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

    console.log("Events", events)

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        const token = localStorage.getItem("token");
        if (token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                };
                const response = await axios.get('/api/events/', config);
                console.log("Response", response);
                setEvents(response.data.event.events);
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate('/login');
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
