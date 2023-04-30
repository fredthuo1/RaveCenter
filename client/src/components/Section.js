// src/components/Section/Section.js
import React from 'react';
import '../style/Section.scss';

const Section = ({ title, content, variant }) => {
    return (
        <section className={`section ${variant ? `section--${variant}` : ''}`}>
            <h2 className="section__title">{title}</h2>
            <p className="section__content">{content}</p>
        </section>
    );
};

export default Section;
