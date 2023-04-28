// client/src/components/EventView.js
import React from 'react';

const EventView = ({ event }) => {
    return (
        <div>
            <h2>{event.name}</h2>
            <p>{event.description}</p>
            <p>URL: {event.url}</p>
            <p>Start: {new Date(event.start).toLocaleString()}</p>
            <p>End: {new Date(event.end).toLocaleString()}</p>
            <p>Created: {new Date(event.created).toLocaleString()}</p>
            <p>Changed: {new Date(event.changed).toLocaleString()}</p>
            <p>Status: {event.status}</p>
            <p>Currency: {event.currency}</p>
            <p>Online Event: {event.online_event ? 'Yes' : 'No'}</p>
            <p>Hide Start Date: {event.hide_start_date ? 'Yes' : 'No'}</p>
            <p>Hide End Date: {event.hide_end_date ? 'Yes' : 'No'}</p>
            <p>Venue ID: {event.venue_id}</p>
            <p>Organizer ID: {event.organizer_id}</p>
            <p>Category ID: {event.category_id}</p>
            <p>Subcategory ID: {event.subcategory_id}</p>
            <p>Format ID: {event.format_id}</p>
            <p>Timezone: {event.timezone}</p>
        </div>
    );
};

export default EventView;
