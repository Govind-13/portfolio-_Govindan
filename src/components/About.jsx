import React from 'react';

const About = () => {
    return (
        <section id="about" className="section about">
            <div className="container">
                <div className="about-grid">
                    <div className="about-image">
                        <div className="img-wrapper">
                            <img src="/assets/avatar.png" alt="Govindan Profile" />
                        </div>
                    </div>
                    <div className="about-text">
                        <h2 className="section-title">About Me</h2>
                        <p className="lead">Multidisciplinary Graphic Designer & AI-Driven Creative Developer</p>
                        <p>With over 3.5+ years of experience, I specialize in
                            creating visuals that combine artistic precision with intelligent automation. My work helps
                            brands, educators, and engineers transform complex ideas into clear, compelling visuals.</p>
                        <p>I specialize in branding, digital illustrations, motion graphics, engineering visuals, and
                            AI-generated content workflows.</p>

                        <div className="stats">
                            <div className="stat-item">
                                <span className="number">3.5+</span>
                                <span className="label">Years Exp</span>
                            </div>
                            <div className="stat-item">
                                <span className="number">200+</span>
                                <span className="label">Visuals Created</span>
                            </div>
                            <div className="stat-item">
                                <span className="number">100+</span>
                                <span className="label">Animations</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;

