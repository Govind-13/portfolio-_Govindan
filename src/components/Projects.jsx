import React from 'react';

const Projects = () => {
    return (
        <section id="work" className="section work">
            <div className="container">
                <h2 className="section-title text-center">Featured Projects</h2>
                <div className="projects-grid">
                    <div className="project-card">
                        <div className="project-img">
                            <img src="/assets/project-engineering.png" alt="Engineering Illustrations" />
                        </div>
                        <div className="project-info">
                            <h3>AI-Generated Engineering Illustrations</h3>
                            <p>200+ ultra-realistic visuals for academic videos covering fluid mechanics, structures,
                                and wireless communication.</p>
                            <div className="tags">
                                <span>3D Render</span>
                                <span>AI</span>
                                <span>Education</span>
                            </div>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="project-img">
                            <img src="/assets/project-branding.png" alt="Brand Design" />
                        </div>
                        <div className="project-info">
                            <h3>Logo & Brand Design</h3>
                            <p>Modern, minimal logos for educational channels, tech startups, and engineering platforms.
                            </p>
                            <div className="tags">
                                <span>Branding</span>
                                <span>Identity</span>
                                <span>Minimalism</span>
                            </div>
                        </div>
                    </div>
                    <div className="project-card">
                        <div className="project-img">
                            <img src="/assets/project-animation.png" alt="Educational Animation" />
                        </div>
                        <div className="project-info">
                            <h3>Animated Educational Series</h3>
                            <p>Complete video assets for 100+ engineering maths topics including 2D/3D animations.</p>
                            <div className="tags">
                                <span>Motion Graphics</span>
                                <span>Animation</span>
                                <span>Maths</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Projects;
