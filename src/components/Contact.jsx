import React from 'react';
import { FaUser, FaEnvelope, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
    return (
        <section id="contact" className="section contact">
            <div className="container">
                <h2 className="section-title text-center">Get In Touch</h2>
                <div className="contact-wrapper">
                    <div className="contact-info">
                        <h3>Let's create something amazing together.</h3>
                        <p>Available for freelance projects and collaborations.</p>
                        <div className="contact-details">
                            <div className="detail">
                                <FaUser style={{ marginRight: '15px' }} />
                                <span>Govindan R</span>
                            </div>
                            <div className="detail">
                                <FaEnvelope style={{ marginRight: '15px' }} />
                                <a href="mailto:govindan.ramu93@gmail.com">govindan.ramu93@gmail.com</a>
                            </div>
                            <div className="detail">
                                <FaLinkedin style={{ marginRight: '15px' }} />
                                <a href="#">LinkedIn Profile</a>
                            </div>
                        </div>
                    </div>
                    <form className="contact-form">
                        <div className="form-group">
                            <input type="text" placeholder="Name" required />
                        </div>
                        <div className="form-group">
                            <input type="email" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <textarea placeholder="Message" rows="5" required></textarea>
                        </div>
                        <button type="submit" className="btn-primary">Send Message</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Contact;
