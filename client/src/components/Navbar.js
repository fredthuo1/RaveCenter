import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import '../style/Navigation.scss';
import UserContext from '../UserContext';

const Navbar = () => {
    const { user, setUser } = useContext(UserContext);

    console.log('User in Navigation:', user); // Add this line to debug

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <nav className="navigation">
            <ul className="navigation__list">
                <li className="navigation__item">
                    <NavLink to="/" activeClassName="navigation__link--active" className="navigation__link">
                        Rave Center
                    </NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/events" activeClassName="navigation__link--active" className="navigation__link">
                        Events
                    </NavLink>
                </li>
                <li className="navigation__item">
                    <NavLink to="/aboutUs" activeClassName="navigation__link--active" className="navigation__link">
                        About
                    </NavLink>
                </li>
                <li className="navigation__item navigation__item--logo">
                    <NavLink to="/" className="navigation__logo-link">
                        <img src={logo} alt="Arcade Logo" className="navigation__logo" />
                    </NavLink>
                </li>
                {!user && (
                    <>
                        <li className="navigation__item">
                            <NavLink activeClassName="navigation__link--active" className="navigation__link" to="/register">
                                Register
                            </NavLink>
                        </li>
                        <li className="navigation__item">
                            <NavLink activeClassName="navigation__link--active" className="navigation__link" to="/login">
                                Login
                            </NavLink>
                        </li>
                    </>
                )}
                {user && (
                    <>
                        <li className="navigation__item ">
                            <NavLink activeClassName="navigation__link--active" className="navigation__link" to="/dashboard">
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="navigation__item ">
                            <NavLink activeClassName="navigation__link--active" className="navigation__link" to="/" onClick={handleLogout}>
                                Logout
                            </NavLink>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
