import React, { useContext } from 'react';
import UserContext from '../UserContext';

const HomePage = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            {user ? (
                <h1>Welcome, {user.firstName} {user.lastName}!</h1>
            ) : (
                <h1>Welcome! Let's party</h1>
            )}
        </div>
    );
};

export default HomePage;
