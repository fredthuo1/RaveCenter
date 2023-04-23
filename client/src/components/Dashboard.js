import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import EventView from './EventView';
import EventForm from './EventForm';
import AddEvent from './AddEvent';
import EventContext from '../EventContext';

import '../style/Dashboard.css';

const Dashboard = () => {
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const navigate = useNavigate();

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

    const updateEvent = async (updatedEvent) => {
        const { data } = await axios.put(`/api/events/${selectedEvent.eventId}`, updatedEvent);
        const updatedEvents = events.map((event) => (event.eventId === data.event.eventId ? data.event : event));
        setEvents(updatedEvents);
        setSelectedEvent(data.event);
        setIsEditMode(false);
    };

    const handleAddEvent = (newEvent) => {
        setEvents([...events, newEvent]);
    };

    const handleViewEvent = (event) => {
        setSelectedEvent(event);
        setIsEditMode(false);
        navigate(`/view-event/${event}`);
    };

    const handleEditEvent = (event) => {
        setSelectedEvent(event);
        setIsEditMode(true);
        navigate(`/edit-event/${event.eventId}`);
    };

    return (
        <EventContext.Provider value={{ selectedEvent, setSelectedEvent }}>
            <div className="container">
                <h2>Events Dashboard</h2>
                <AddEvent className="add-event-btn" onEventAdded={handleAddEvent} />
                {/* 
                <ul className="event-list">
                      {events.map((event) => (
                        <li key={event.eventId} className={selectedEvent === event ? 'selected' : ''} onClick={() => setSelectedEvent(event)}>
                            <span className="event-name">{event.name}</span>
                            <span className="event-date">{event.date}</span>
                              <span className="edit-event-btn" onClick={() => handleEditEvent(event)}>Edit</span> 
                        </li>
                    ))}
                </ul> */}
                <div className="event-card-list">
                    {events.map((event) => (
                        <div key={event.eventId} className={`event-card ${selectedEvent === event ? 'selected' : ''}`}>
                            <h3 className="event-name">{event.name}</h3>
                            <p className="event-description">{event.description}</p>
                            <div className="event-link"><a href={event.url}>Event Link</a></div>
                            <div className="event-date">
                                <span className="start-date">Start: {event.start}</span>
                                <span className="end-date">End: {event.end}</span>
                            </div>
                            {/* <div className="edit-event-btn" onClick={() => handleEditEvent(event)}>Edit</div> */}
                        </div>
                    ))}
                </div>
                {selectedEvent && (
                    <div className="event-details">
                        <h3>Selected Event</h3>
                        {!isEditMode && <EventView event={selectedEvent} />}
                        {isEditMode && <EventForm event={selectedEvent} onSubmit={updateEvent} />}
                        <button className="edit-event-btn" onClick={() => setIsEditMode(!isEditMode)}>
                            {isEditMode ? 'View Event' : 'Edit Event'}
                        </button> 
                    </div>
                )}
            </div>
        </EventContext.Provider>
    );
};

export default Dashboard;
