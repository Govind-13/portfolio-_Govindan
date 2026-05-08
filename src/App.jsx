import React, { useEffect } from 'react';
import Header from './components/Header';
import NavDrawer from './components/NavDrawer';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import Projects from './components/Projects';
import Methodology from './components/Methodology';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import ThreeBackground from './components/ThreeBackground';

function App() {
  useEffect(() => {
    // Scroll Animations
    const observerOptions = {
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Timeout to ensure DOM is ready if needed, though useEffect usually runs after render & paint
    setTimeout(() => {
      const elementsToAnimate = document.querySelectorAll('.section-title, .about-text, .skill-category, .service-card, .project-card, .method-list li');

      if (elementsToAnimate.length > 0) {
        elementsToAnimate.forEach(el => {
          el.style.opacity = '0';
          el.style.transform = 'translateY(30px)';
          el.style.transition = 'all 0.6s ease-out';
          observer.observe(el);
        });
      }
    }, 100);

    // Cleanup not strictly necessary for one-off animation on static page, but good practice
    return () => {
      // simplified cleanup
    };
  }, []);

  return (
    <>
      <ThreeBackground />
      <Cursor />
      <NavDrawer />
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Methodology />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
