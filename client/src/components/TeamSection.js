import React from 'react';
import Section from '../components/Section';
import Founder from '../assets/Founder.png';
import '../style/TeamSection.scss';

const TeamSection = () => {
    const title = "Team";
    const content = (
        <div className="team">
            <div className="team__member">
                <img className="team__member__image" src={Founder} alt="Team member 1" />
                <div className="team__member__info">
                    <h3 className="team__member__info__name">Fredrick Muikia</h3>
                    <p className="team__member__info__role">Founder</p>
                </div>
            </div>
        </div>
    );

    return (
        <Section className="team" title={title} content={content} variant="light"></Section>
    );
};

export default TeamSection;
