import React from 'react';
import '../style/EventCard.scss';
import Founder from '../assets/Founder.png';


const EventCard = ({ event }) => {
    return (
        <div className="card">
            <div className="card-image">
                <img src={Founder} alt={event.title} />
            </div>
            <div className="card-content">
                <h3>{event.title}</h3>
                <p>{event.date}</p>
                <p>{event.time}</p>
                <p>{event.location}</p>
                <a href="#">Learn More</a>
            </div>
        </div>
    );
};

export default EventCard;
