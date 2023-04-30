// src/components/Header/Header.js
import React from 'react';
import '../style/Header.scss';

const Header = () => {
    return (
        <header className="header">
            <div className="header__logo">
                <h1 className="header__title">Rave Center</h1>
                <p className="header__subtitle">Find a party near you!</p>
            </div>
        </header>
    );
};

export default Header;

