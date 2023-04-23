// client/src/components/AddEvent.js

import React, { useState } from 'react';
import EventForm from './EventForm';
import axios from 'axios';

const AddEvent = ({ onEventAdded }) => {
    const [showForm, setShowForm] = useState(true);

    const createEvent = async (newEvent) => {
        const { data } = await axios.post('/api/events', newEvent);
        onEventAdded(data.event);
        setShowForm(false);
    };

    return (
        <div>
            {!showForm && (
                <button onClick={() => setShowForm(true)}>Add New Event</button>
            )}
            {showForm && <EventForm onSubmit={createEvent} onCancel={() => setShowForm(false)} />}
        </div>
    );
};

export default AddEvent;
