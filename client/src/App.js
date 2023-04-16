import React, { useState } from 'react';
import AppRouter from './AppRouter';
import UserContext from './UserContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <AppRouter />
        </UserContext.Provider>
    );
}

export default App;
