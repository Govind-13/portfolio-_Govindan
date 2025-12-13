import React from 'react';
import { FaFingerprint, FaBrain, FaFilm, FaChartPie } from 'react-icons/fa';

const Services = () => {
    return (
        <section id="services" className="section services">
            <div className="container">
                <h2 className="section-title text-center">What I Create</h2>
                <div className="services-grid">
                    <div className="service-card">
                        <div className="icon"><FaFingerprint /></div>
                        <h3>Brand Identity Systems</h3>
                        <p>Logos, typography, color palettes, and brand manuals for startups and tech companies.</p>
                    </div>
                    <div className="service-card">
                        <div className="icon"><FaBrain /></div>
                        <h3>AI-Generated Concepts</h3>
                        <p>High-quality AI images for engineering, e-learning, and futuristic product renders.</p>
                    </div>
                    <div className="service-card">
                        <div className="icon"><FaFilm /></div>
                        <h3>Motion Graphics</h3>
                        <p>2D engineering animations, explainer videos, and AI-aided animation assets.</p>
                    </div>
                    <div className="service-card">
                        <div className="icon"><FaChartPie /></div>
                        <h3>Technical Visuals</h3>
                        <p>Mathematical diagrams, scientific illustrations, and realistic 3D models for teaching.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;
