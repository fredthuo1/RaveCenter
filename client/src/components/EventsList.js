import React from 'react';
import '../style/EventsListPage.scss';
import EventCard from '../components/EventCard';
import one from '../assets/party1.jpg';
import two from '../assets/party2.jpg';
import three from '../assets/party3.jpg';
import four from '../assets/party5.jpg';
import five from '../assets/party6.jpg';
import six from '../assets/party7.jpg';
import seven from '../assets/party4.jpg';
import eight from '../assets/party8.jpg';


const images = [
    one, two, three, four, five, six, seven, eight
];

const EventsList = ({ events }) => {
    console.log(events)
    return (
        <section className="events-list">
            <div className="container">
                <h2>Upcoming Events</h2>
                <div className="cards">
                    {events && events.map((event, index) => {
                        const imageIndex = Math.floor(Math.random() * images.length);
                        const image = images[imageIndex];
                        return (
                            <EventCard key={event.id} event={event} image={image} />
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default EventsList;
