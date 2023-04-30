import React from 'react';
import '../style/EventsListPage.scss';
import EventCard from '../components/EventCard';

const EventsList = ({ events }) => {
    console.log(events)
    return (
        <section className="events-list">
            <div className="container">
                <h2>Upcoming Events</h2>
                <div className="cards">
                    {events && events.map(event => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default EventsList;
