// client/src/components/EventForm.js
import React, { useState } from 'react';

const EventForm = ({ event, onSubmit }) => {
    const [name, setName] = useState(event?.name);
    const [description, setDescription] = useState(event?.description);
    const [url, setUrl] = useState(event?.url);
    const [start, setStart] = useState(event?.start);
    const [end, setEnd] = useState(event?.end);
    const [status, setStatus] = useState(event?.status);
    const [currency, setCurrency] = useState(event?.currency);
    const [online_event, setOnlineEvent] = useState(event?.online_event);
    const [hide_start_date, setHideStartDate] = useState(event?.hide_start_date);
    const [hide_end_date, setHideEndDate] = useState(event?.hide_end_date);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, description, url, start, end, status, currency, online_event, hide_start_date, hide_end_date });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <br />
            <label>Description:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <br />
            <label>URL:</label>
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
            />
            <br />
            <label>Start:</label>
            <input
                type="datetime-local"
                value={start}
                onChange={(e) => setUrl(e.target.value)}
            />
            <br />
            <label>End:</label>
            <input
                type="datetime-local"
                value={end}
                onChange={(e) => setEnd(e.target.value)}
            />
            <br />
            <label>Status:</label>
            <input
                type="text"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <br />
            <label>Currency:</label>
            <input
                type="text"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
            />
            <br />
            <label>Online Event:</label>
            <input
                type="checkbox"
                checked={online_event}
                onChange={(e) => setOnlineEvent(e.target.checked)}
            />
            <br />
            <label>Hide Start Date:</label>
            <input
                type="checkbox"
                checked={hide_start_date}
                onChange={(e) => setHideStartDate(e.target.checked)}
            />
            <br />
            <label>Hide End Date:</label>
            <input
                type="checkbox"
                checked={hide_end_date}
                onChange={(e) => setHideEndDate(e.target.checked)}
            />
            <br />
            <button type="submit">Add Event</button>
        </form>
    );
};

export default EventForm;

