import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';

const NavDrawer = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.classList.add('nav-drawer-open');
        } else {
            document.body.classList.remove('nav-drawer-open');
        }
    };

    const closeDrawer = () => {
        setIsOpen(false);
        document.body.classList.remove('nav-drawer-open');
    };

    const handleLinkClick = () => {
        closeDrawer();
    };

    return (
        <>
            {/* Nav Toggle Button */}
            <button 
                className="nav-drawer-btn" 
                onClick={toggleDrawer}
                aria-label="Toggle navigation menu"
                aria-expanded={isOpen}
            >
                {isOpen ? <HiX /> : <HiMenu />}
            </button>

            {/* Scrim (Overlay) */}
            {isOpen && (
                <div 
                    className="nav-scrim" 
                    onClick={closeDrawer}
                    aria-hidden="true"
                ></div>
            )}

            {/* Navigation Drawer */}
            <nav className={`nav-drawer ${isOpen ? 'open' : ''}`}>
                <div className="drawer-content">
                    <div className="drawer-header">
                        <h2>Navigation</h2>
                        <button 
                            className="close-btn"
                            onClick={closeDrawer}
                            aria-label="Close menu"
                        >
                            <HiX />
                        </button>
                    </div>

                    <ul className="drawer-links">
                        <li><a href="#about" onClick={handleLinkClick}>About</a></li>
                        <li><a href="#skills" onClick={handleLinkClick}>Skills</a></li>
                        <li><a href="#work" onClick={handleLinkClick}>Work</a></li>
                        <li><a href="#services" onClick={handleLinkClick}>Services</a></li>
                        <li><a href="#methodology" onClick={handleLinkClick}>Methodology</a></li>
                        <li><a href="#contact" className="btn-primary" onClick={handleLinkClick}>Contact Me</a></li>
                    </ul>
                </div>
            </nav>
        </>
    );
};

export default NavDrawer;
