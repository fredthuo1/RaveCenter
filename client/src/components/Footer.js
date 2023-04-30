// src/components/Footer/Footer.js
import React from 'react';
import '../style/Footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div className="footer__logo">
                    {/* Add your logo image here */}
                </div>
                <ul className="footer__links">
                    <li>
                        <a href="/" className="footer__link">Home</a>
                    </li>
                    <li>
                        <a href="/aboutUs" className="footer__link">About</a>
                    </li>
                    <li>
                        <a href="/contact" className="footer__link">Contact</a>
                    </li>
                </ul>
                <p className="footer__copyright">© {new Date().getFullYear()} Your Company. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
