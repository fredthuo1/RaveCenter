import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/EventCard.scss';

const EventCard = (props) => {
    const navigate = useNavigate();
    const { name, description, start, end, currency } = props.event;
    const imageUrl = props.image;

    const handleClick = () => {
        navigate('/event', { state: { event: props } });
    }

    return (
        <div className="event-card">
            <img src={imageUrl} alt={props.title} className="event-image" />
            <div className="event-details">
                <h3>{name.text}</h3>
                <p>{description.text}</p>
                <p>Start: {start.local}</p>
                <p>End: {end.local}</p>
                <p>Currency: {currency}</p>
                <button onClick={handleClick}>
                    Find more about the Event!
                </button>
            </div>
        </div>
    );
};

export default EventCard;
