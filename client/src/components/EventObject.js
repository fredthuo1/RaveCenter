import React from 'react';
import '../style/EventCard.scss';
import one from '../assets/party1.jpg';
import two from '../assets/party1.jpg';
import three from '../assets/party1.jpg';
import four from '../assets/party1.jpg';
import five from '../assets/party1.jpg';
import six from '../assets/party1.jpg';
import seven from '../assets/party1.jpg';
import eight from '../assets/party1.jpg';

const images = [
    one, two, three, four, five, six, seven, eight
];

const EventObject = (props) => {
    const { name, description, start, end, currency } = props.event;
    const randomIndex = Math.floor(Math.random() * images.length);
    const imageUrl = images[randomIndex];

    return (
        <div className="card">
            <div className="card-image">
                <img src={imageUrl} alt={props.title} />
            </div>
            <div className="card-content">
                <h3>{name.text}</h3>
                <p>{description.text}</p>
                <p>Start: {start.local}</p>
                <p>End: {end.local}</p>
                <p>Currency: {currency}</p>
            </div>
        </div>
    );
};

export default EventObject;
