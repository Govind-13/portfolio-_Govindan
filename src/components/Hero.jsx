import React from 'react';
import { FaArrowDown } from 'react-icons/fa';

const Hero = () => {
    return (
        <section id="hero" className="hero">
            <div className="hero-bg">
                <img src="/assets/hero-bg.png" alt="Futuristic Background" />
                <div className="overlay"></div>
            </div>
            <div className="container hero-content">
                <span className="tagline">Graphic Design • AI/ML Tools • Visual Communication</span>
                <h1>Designing the Future with <span className="gradient-text">Art & AI</span></h1>
                <p>I blend traditional design principles with intelligent automation to transform complex ideas into
                    clear, compelling visuals.</p>
                <div className="hero-btns">
                    <a href="#work" className="btn-primary" style={{ marginRight: '15px' }}>View Projects</a>
                    <a href="#contact" className="btn-secondary">Get in Touch</a>
                </div>
            </div>
            <div className="scroll-down">
                <FaArrowDown />
            </div>
        </section>
    );
};

export default Hero;
