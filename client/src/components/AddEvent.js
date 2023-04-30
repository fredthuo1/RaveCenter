import React, { useState } from 'react';
import EventForm from './EventForm';
import axios from 'axios';

import '../style/AddEvents.scss';

const AddEvent = ({ onEventAdded }) => {
    const [showForm, setShowForm] = useState(true);

    const createEvent = async (newEvent) => {
        const { data } = await axios.post('/api/events', newEvent);
        onEventAdded(data.event);
        setShowForm(false);
    };

    return (
        <div className="add-event">
            {!showForm && (
                <button className="add-event-button" onClick={() => setShowForm(true)}>Add New Event</button>
            )}
            {showForm && <div className="add-event-form"><EventForm onSubmit={createEvent} onCancel={() => setShowForm(false)} /></div>}


        </div>
    );
};

export default AddEvent;
