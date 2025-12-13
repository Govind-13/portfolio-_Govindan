import React, { useState, useEffect } from 'react';

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileActive, setMobileActive] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleMobileMenu = () => {
        setMobileActive(!mobileActive);
    };

    const closeMobileMenu = () => {
        setMobileActive(false);
    };

    const headerStyle = scrolled ? {
        background: 'rgba(5, 5, 5, 0.95)',
        boxShadow: '0 5px 20px rgba(0,0,0,0.5)'
    } : {};

    return (
        <header className="header" style={headerStyle}>
            <div className="container">
                <a href="#" className="logo">Govindan.R<span className="dot">.</span></a>
                <nav className="navbar">
                    <ul className={`nav-links ${mobileActive ? 'active' : ''}`}>
                        <li><a href="#about" onClick={closeMobileMenu}>About</a></li>
                        <li><a href="#skills" onClick={closeMobileMenu}>Skills</a></li>
                        <li><a href="#work" onClick={closeMobileMenu}>Work</a></li>
                        <li><a href="#services" onClick={closeMobileMenu}>Services</a></li>
                        <li><a href="#contact" className="btn-primary" onClick={closeMobileMenu}>Contact Me</a></li>
                    </ul>
                    <div className={`hamburger ${mobileActive ? 'active' : ''}`} onClick={toggleMobileMenu}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Header;

