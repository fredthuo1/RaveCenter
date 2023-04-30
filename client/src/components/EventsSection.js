import React from 'react';
import Section from '../components/Section';
import EventCard from '../components/EventCard';
import '../style/EventsSection.scss';
import Founder from '../assets/Founder.png';

const EventsSection = () => {
    const title = 'Upcoming Events';

    const eventsData = [
        {
            id: 1,
            image: {Founder},
            title: "Event 1",
            date: "October 1, 2023",
            time: "10:00 AM - 1:00 PM",
            location: "123 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 2,
            image: { Founder },
            title: "Event 2",
            date: "October 5, 2023",
            time: "2:00 PM - 5:00 PM",
            location: "456 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 3,
            image: { Founder },
            title: "Event 3",
            date: "October 10, 2023",
            time: "6:00 PM - 9:00 PM",
            location: "789 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 4,
            image: { Founder },
            title: "Event 1",
            date: "October 1, 2023",
            time: "10:00 AM - 1:00 PM",
            location: "123 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 5,
            image: { Founder },
            title: "Event 2",
            date: "October 5, 2023",
            time: "2:00 PM - 5:00 PM",
            location: "456 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 6,
            image: { Founder },
            title: "Event 3",
            date: "October 10, 2023",
            time: "6:00 PM - 9:00 PM",
            location: "789 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 7,
            image: { Founder },
            title: "Event 1",
            date: "October 1, 2023",
            time: "10:00 AM - 1:00 PM",
            location: "123 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 8,
            image: { Founder },
            title: "Event 2",
            date: "October 5, 2023",
            time: "2:00 PM - 5:00 PM",
            location: "456 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 9,
            image: { Founder },
            title: "Event 3",
            date: "October 10, 2023",
            time: "6:00 PM - 9:00 PM",
            location: "789 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 10,
            image: { Founder },
            title: "Event 1",
            date: "October 1, 2023",
            time: "10:00 AM - 1:00 PM",
            location: "123 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 10,
            image: { Founder },
            title: "Event 2",
            date: "October 5, 2023",
            time: "2:00 PM - 5:00 PM",
            location: "456 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
        {
            id: 12,
            image: { Founder },
            title: "Event 3",
            date: "October 10, 2023",
            time: "6:00 PM - 9:00 PM",
            location: "789 Main Street",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ut maximus arcu. Nullam ut lorem eget enim fringilla sagittis."
        },
    ];


    const eventsList = eventsData.map((event) => (
        <div className="event-card">
            <EventCard key={event.id} event={event} />
        </div>
    ));

    const content = <div className="events-section">{eventsList}</div>;

    return (
        <Section
            title={title}
            content={content}
            variant='light'
        ></Section>
    );
};

export default EventsSection;
