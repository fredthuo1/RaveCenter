import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
import '../style/Registration.scss';

const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Email regex
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;


    const onSubmit = async e => {
        e.preventDefault();
        setError('');

        if (!validateForm()) {
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ firstName, lastName, email, password });
            const response = await axios.post('/api/auth/register', body, config);

            setUser(response.data.user); // Set the user data in the global state
            navigate('/login'); // Redirect to the home page after successful registration
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Error occurred while registering. Please try again.');
            }
        }
    };

    const validateForm = () => {
        // Check if all fields are filled out
        if (!firstName || !lastName || !email || !password) {
            setError('Please fill out all fields.');
            return false;
        }

        // Check if it is a valid email
        if (!emailRegex.test(email)) {
            setError('Invalid email format.');
            return false;
        }

        // Validate password length
        if (password.length < 8) {
            setError('Password must be at least 8 characters.');
            return false;
        }

        // Password format check
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasDigit = /\d/.test(password);
        const hasSpecialChar = /[^A-Za-z0-9]/.test(password);

        if (!(hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar)) {
            setError('Password must include uppercase letters, lowercase letters, digits, and special characters.');
            return false;
        }

        return true;
    };

    return (
        <div className="registration">
            <div>
                <h2>Register</h2>
                {error && (
                    <div className="alert alert-danger" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)}
                    />
                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={e => setLastName(e.target.value)}
                    />
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <button type="submit">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Register;
