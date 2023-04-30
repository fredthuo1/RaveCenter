import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../UserContext';
import '../style/Hero.scss';

const Hero = () => {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/events');
    }

    return (
        <div className="hero">
            {user ? (
                <>
                    <h1 className="hero__title">Welcome to Rave Center {user.firstName}!</h1>
                    <p className="hero__subtitle">Let's Party</p>
                    <button onClick={handleClick}>
                        View Events near You!
                    </button>
                </>
            ) : (
                <>
                    <h1 className="hero__title">Welcome to Rave Center!</h1>
                    <p className="hero__subtitle">Let's Party</p>
                    <button onClick={handleClick}>
                        View Events near You!
                    </button>
                </>
            )}
        </div>
    );
};

export default Hero;
