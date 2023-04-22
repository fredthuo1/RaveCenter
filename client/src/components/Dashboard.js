// client/src/components/Dashboard.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EventView from './EventView';
import EventForm from './EventForm';
import AddEvent from './AddEvent';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const { data } = await axios.get('/api/events');
            setEvents(data.events || []);
        } catch (error) {
            console.error('Error fetching events:', error);
            setEvents([]);
        }
    };

    const addEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const updateEvent = async (updatedEvent) => {
        const { data } = await axios.put(`/api/events/${selectedEvent.eventId}`, updatedEvent);
        const updatedEvents = events.map((event) => (event.eventId === data.event.eventId ? data.event : event));
        setEvents(updatedEvents);
        setSelectedEvent(data.event);
        setIsEditMode(false);
    };

    return (
        <div>
            <h2>Events Dashboard</h2>
            <AddEvent onEventAdded={addEvent} />
            <div>
                <h3>Event List</h3>
                <ul>
                    {events.map((event) => (
                        <li key={event.eventId} onClick={() => setSelectedEvent(event)}>
                            {event.name}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedEvent && (
                <div>
                    <h3>Selected Event</h3>
                    {!isEditMode && <EventView event={selectedEvent} />}
                    {isEditMode && <EventForm event={selectedEvent} onSubmit={updateEvent} />}
                    <button onClick={() => setIsEditMode(!isEditMode)}>
                        {isEditMode ? 'View Event' : 'Edit Event'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
