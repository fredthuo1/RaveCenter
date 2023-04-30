import React from 'react';
import '../style/ContactPage.scss';

const ContactPage = () => {
    return (
        <main className="contact-page">
            <div className="contact-page__content">
                <h2>Contact Us</h2>
                <p>For all inquiries please use the form below.</p>

                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" required />

                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" required />

                    <label htmlFor="message">Message</label>
                    <textarea id="message" required />

                    <button type="submit">Send</button>
                </form>
            </div>
        </main>
    );
};

export default ContactPage;

