import React, { useContext } from 'react';
import UserContext from '../UserContext';

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Welcome!</h1>
        </div>
    );
};

export default HomePage;
