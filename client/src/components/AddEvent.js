import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EventForm from './EventForm';
import axios from 'axios';
import { toast } from 'react-toastify';

import '../style/AddEvents.scss';

const AddEvent = ({ onEventAdded }) => {
    const [showForm, setShowForm] = useState(true);
    const navigate = useNavigate();

    const createEvent = async (formData) => {
        const newEvent = Object.fromEntries(formData.entries());
        const token = localStorage.getItem("token");

        const eventBrightEvent = transformFormData(formData);

        if (token) {
            try {
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                };
                console.log(config);
                const { data } = await axios.post('/api/events', newEvent, config);
                const { eventBrightData } = await axios.post('/api/events/eventbrite/events/', eventBrightEvent);
                console.log(eventBrightData);
                onEventAdded(data.event);
                setShowForm(false);
            } catch (error) {
                console.log(error.response.data);
                if (error.response) {
                    toast.error(await error.response.data);
                } else {
                    toast.error('An error occurred while creating the event. Please try again later.')
                    alert('An error occurred while creating the event. Please try again later.');
                }
            }
        } else {
            navigate('/login');
        }
    };

    const transformFormData = (formData) => {
        const {
            name,
            description,
            start,
            end,
            currency,
            online_event,
            hide_start_date,
            hide_end_date,
            timezone,
        } = Object.fromEntries(formData.entries());
        console.log("Timezone", start);
        console.log("Timezone", end);

        const startTime = start.slice(0, -5) + "Z";
        const endTime = end.slice(0, -5) + "Z";

        const event = {
            name: { html: name },
            description: { html: description },
            start: { utc: startTime, timezone },
            end: { utc: endTime, timezone },
            currency,
            online_event: online_event === 'on',
            hide_start_date: hide_start_date === 'on',
            hide_end_date: hide_end_date === 'on',
        };

        return { event };
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
