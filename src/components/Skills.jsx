import React from 'react';
import { FaPenNib, FaRobot, FaLaptopCode } from 'react-icons/fa';

const Skills = () => {
    return (
        <section id="skills" className="section skills">
            <div className="container">
                <h2 className="section-title text-center">Core Skills</h2>
                <div className="skills-grid">
                    <div className="skill-category">
                        <h3><FaPenNib style={{ marginRight: '10px' }} /> Graphic Design</h3>
                        <ul>
                            <li>Brand Identity & Logo Design</li>
                            <li>Posters, Brochures, Banners</li>
                            <li>Infographics & Diagrams</li>
                            <li>2D/3D Engineering Illustrations</li>
                            <li>UI/UX Layouts</li>
                        </ul>
                    </div>
                    <div className="skill-category">
                        <h3><FaRobot style={{ marginRight: '10px' }} /> AI-Powered Workflows</h3>
                        <ul>
                            <li>Prompt Engineering (DALL·E, Midjourney)</li>
                            <li>AI-Based Animation Planning</li>
                            <li>AI Photo Enhancement</li>
                            <li>Automated Design Pipelines (Python)</li>
                            <li>Text-to-Visual Storytelling</li>
                        </ul>
                    </div>
                    <div className="skill-category">
                        <h3><FaLaptopCode style={{ marginRight: '10px' }} /> Software Expertise</h3>
                        <div className="software-tags">
                            <span>Photoshop</span>
                            <span>Illustrator</span>
                            <span>Premiere Pro</span>
                            <span>After Effects</span>
                            <span>Blender</span>
                            <span>Figma</span>
                            <span>Python</span>
                            <span>Matplotlib</span>
                            <span>MATLAB</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Skills;
