// client/src/components/EventForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DateTime } from 'luxon';
import '../style/AddEvent.scss';

const EventForm = ({ event, onSubmit }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [start, setStart] = useState({ date: '', time: '' });
    const [end, setEnd] = useState({ date: '', time: '' });
    const [status, setStatus] = useState('');
    const [currency, setCurrency] = useState('');
    const [online_event, setOnlineEvent] = useState(false);
    const [hide_start_date, setHideStartDate] = useState(false);
    const [hide_end_date, setHideEndDate] = useState(false);
    const [timezone, setTimezone] = useState('America/New_York');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check if name and description are provided
        if (!name || !description) {
            alert('Please provide values for the Name and Description fields.');
            return;
        }

        // Convert local start and end date and time to UTC
        const startDate = DateTime.fromObject({
            day: parseInt(start.date.substring(8, 10)),
            month: parseInt(start.date.substring(5, 7)),
            year: parseInt(start.date.substring(0, 4)),
            hour: parseInt(start.time.substring(0, 2)),
            minute: parseInt(start.time.substring(3, 5)),
            zone: timezone
        }).toUTC().toISO();

        const endDate = DateTime.fromObject({
            day: parseInt(end.date.substring(8, 10)),
            month: parseInt(end.date.substring(5, 7)),
            year: parseInt(end.date.substring(0, 4)),
            hour: parseInt(end.time.substring(0, 2)),
            minute: parseInt(end.time.substring(3, 5)),
            zone: timezone
        }).toUTC().toISO();


        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('url', url);
        formData.append('start', startDate);
        formData.append('end', endDate);
        formData.append('status', status);
        formData.append('currency', currency);
        formData.append('online_event', online_event);
        formData.append('hide_start_date', hide_start_date);
        formData.append('hide_end_date', hide_end_date);
        formData.append('timezone', timezone);
        onSubmit(formData);
 
    };

    const handleStartDateChange = (event) => {
        setStart({ ...start, date: event.target.value });
    };

    const handleStartTimeChange = (event) => {
        setStart({ ...start, time: event.target.value });
    };

    const handleEndDateChange = (event) => {
        setEnd({ ...end, date: event.target.value });
    };

    const handleEndTimeChange = (event) => {
        setEnd({ ...end, time: event.target.value });
    };

    return (
        <div className="add-event">
            <form onSubmit={handleSubmit}>
                <input
                    placeholder="Event Name"
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <textarea
                    placeholder="Event Description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    placeholder="Link to the Event"
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <div className="form-group">
                    <input type="date" placeholder="Date" name="date" onChange={handleStartDateChange} required />
                    <input type="time" placeholder="Time" name="time" onChange={handleStartTimeChange} required />
                </div>
                <div className="form-group">
                    <input type="date" placeholder="Date" name="date" onChange={handleEndDateChange} required />
                    <input type="time" placeholder="Time" name="time" onChange={handleEndTimeChange} required />
                </div>
                <select id="timezone" value={timezone} onChange={(e) => setTimezone(e.target.value)}>
                    <option value="">Select a timezone</option>
                    <option value='America/New_York'>America/New_York</option>
                    <option value='America/Los_Angeles'>America/Los_Angeles</option>
                    <option value='Europe/London'>Europe/London</option>
                    <option value='Asia/Tokyo'>Asia/Tokyo</option>
                    <option value='Australia/Sydney'>Australia/Sydney</option>
                </select>
                <input
                    type="text"
                    id="status"
                    placeholder="Event Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />
                <input
                    placeholder="Currency"
                    id="currency"
                    type="text"
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                />
                <label>Online Event:</label>
                <input
                    placeholder="Online Event"
                    id="online_event"
                    type="checkbox"
                    checked={online_event}
                    onChange={(e) => setOnlineEvent(e.target.checked)}
                />
                <label>Hide Start Date:</label>
                <input
                    placeholder="Hide Start Date"
                    id="hide_start_date"
                    type="checkbox"
                    checked={hide_start_date}
                    onChange={(e) => setHideStartDate(e.target.checked)}
                />
                <label>Hide End Date:</label>
                <input
                    placeholder="Hide End Date"
                    id="hide_end_date"
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

