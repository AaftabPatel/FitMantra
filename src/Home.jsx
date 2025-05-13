import React, { useEffect } from 'react';
import Slideshow from './Slideshow';
import About from './About';
import Contact from './Contact';
import Services from './Services';
import Trainers from './Trainers';

function Home() {
 useEffect(() => {
    const scrollToSection = () => {
      if (window.location.hash === '#about') {
        const section = document.getElementById('about');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (window.location.hash === '#services') {
        const section = document.getElementById('services');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (window.location.hash === '#contactUs') {
        const section = document.getElementById('contactUs');
        if (section) {
          section.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Run on initial load
    scrollToSection();

    // Listen for hash changes
    window.addEventListener('hashchange', scrollToSection);

    return () => {
      window.removeEventListener('hashchange', scrollToSection);
    };
  }, []);
  return (
    <div className="home">
      <Slideshow />
      <About />
      <Services />
      <Contact />
      <Trainers />
    </div>
  );
}

export default Home;
