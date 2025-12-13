import React from 'react';
import { FaLinkedin, FaBehance, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer>
            <div className="container">
                <p>&copy; 2025 Govindan. All rights reserved.</p>
                <div className="social-links">
                    <a href="#"><FaLinkedin /></a>
                    <a href="#"><FaBehance /></a>
                    <a href="#"><FaInstagram /></a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
