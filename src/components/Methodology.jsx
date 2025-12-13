import React from 'react';
import { FaBolt, FaBullseye, FaCubes, FaLayerGroup } from 'react-icons/fa';
import { FaWandMagicSparkles } from 'react-icons/fa6';

const Methodology = () => {
    return (
        <section className="section methodology">
            <div className="container">
                <div className="method-content">
                    <h2 className="section-title">How AI Enhances My Workflow</h2>
                    <ul className="method-list">
                        <li><FaBolt style={{ marginRight: '15px' }} /> Speed up ideation and concept generation</li>
                        <li><FaBullseye style={{ marginRight: '15px' }} /> Produce high-precision visuals for technical topics
                        </li>
                        <li><FaCubes style={{ marginRight: '15px' }} /> Create 3D scenes quickly and efficiently</li>
                        <li><FaLayerGroup style={{ marginRight: '15px' }} /> Maintain consistency across hundreds of images</li>
                        <li><FaWandMagicSparkles style={{ marginRight: '15px' }} /> Visualize abstract mathematical concepts
                        </li>
                    </ul>
                    <p className="method-summary">This combination of <strong>Human Creativity + AI Power</strong> makes my
                        work fast, consistent, and visually strong.</p>
                </div>
            </div>
        </section>
    );
};

export default Methodology;
