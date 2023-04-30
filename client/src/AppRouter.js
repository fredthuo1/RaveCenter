import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './UserContext';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import Home from './components/HomePage';
import Dashboard from './components/Dashboard';
import AddEvent from './components/AddEvent';
import EventForm from './components/EventForm';
import EventView from './components/EventView';
import AboutUs from './components/AboutUs';
import Header from './components/Header';
import Footer from './components/Footer';
import ContactPage from './components/ContactPage';

const AppRouter = () => {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <Router>
                <Header />
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/add-event" element={<AddEvent />} />
                    <Route path="/view-event" element={<EventForm />} />
                    <Route path="/edit-event" element={<EventView />} />
                    <Route path="/aboutUs" element={<AboutUs />} />
                    <Route path="/contact" element={<ContactPage />} />
                </Routes>
                <Footer />
            </Router>
        </UserContext.Provider>
    );
};

export default AppRouter;
