import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../UserContext';
import '../style/Login.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const onSubmit = async e => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const body = JSON.stringify({ email, password });
            const response = await axios.post('/api/auth/login', body, config);

            setUser(response.data.user); // Set the user data in the global state
            navigate('/'); // Redirect to the home page after successful login
        } catch (error) {
            console.error(error);

            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred while logging in. Please try again.');
            }
        }
    };

    const validateForm = () => {
        if (!email || !password) {
            setError('Please fill out all fields.');
            return false;
        }

        const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
        if (!emailRegex.test(email)) {
            setError('Invalid email format.');
            return false;
        }

        return true;
    };

    return (
        <div className="login">
                <div>
                    <h2>Login</h2>
                    {error && (
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                    )}
                    <form onSubmit={onSubmit}>
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
                        <button type="submit" className="btn btn-primary btn-block">
                            Login
                        </button>
                    </form>
                </div>
        </div>
    );
};

export default Login;
