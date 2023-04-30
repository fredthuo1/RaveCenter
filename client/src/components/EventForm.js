// client/src/components/EventForm.js
import React, { useState } from 'react';
import '../style/AddEvent.scss';

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
    const [image, setImage] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('url', url);
        formData.append('start', start);
        formData.append('end', end);
        formData.append('status', status);
        formData.append('currency', currency);
        formData.append('online_event', online_event);
        formData.append('hide_start_date', hide_start_date);
        formData.append('hide_end_date', hide_end_date);
        formData.append('image', image);
        onSubmit(formData);
    };

    const handleChange = (e) => {
    };

    return (
        <div className="add-event">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Event Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    placeholder="Link to the Event"
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div className="form-group">
                    <input type="date" placeholder="Date" name="date" onChange={handleChange} required />
                    <input type="time" placeholder="Time" name="time" onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <input type="date" value={start} placeholder="Date" name="date" onChange={handleChange} required />
                    <input type="time" value={end} placeholder="Time" name="time" onChange={handleChange} required />
                </div>
                <input
                    type="text"
                    placeholder="Event Satus"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input
                    placeholder="Currency"
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                />
                <label>Online Event:</label>
                <input
                    placeholder="Online Event"
                    type="checkbox"
                    checked={online_event}
                    onChange={(e) => setOnlineEvent(e.target.checked)}
                />
                <label>Hide End Start:</label>
                <input
                    placeholder="Hide Start Date"
                    type="checkbox"
                    checked={hide_start_date}
                    onChange={(e) => setHideStartDate(e.target.checked)}
                />
                <label>Hide End Date:</label>
                <input
                    placeholder="Hide End Date"
                    type="checkbox"
                    checked={hide_end_date}
                    onChange={(e) => setHideEndDate(e.target.checked)}
                />
                <br />
                <br />
                <button type="submit">Add Event</button>
            </form>
        </div>
    );

};

export default EventForm;

