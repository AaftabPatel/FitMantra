import React, { useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import logo from './logo.png';
import {useState} from 'react';
import SideNavbar from './SideNavbar';

const Header = () => {
  const [isSideNavbarOpen, setIsSideNavbarOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();

  const handleNavigation = (id) => {
  if (location.pathname === "/") {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    } else {
      history.push(`/#${id}`);
    }
  };
  const toggleSideNavbar = () => {
      setIsSideNavbarOpen(!isSideNavbarOpen);
  };

  useEffect(() => {
    const header = document.querySelector('.header');
    const handleScroll = () => {
      if (window.scrollY > 0) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="header">

      <button className="toggleBtn" onClick={toggleSideNavbar}>☰</button>
      <SideNavbar isOpen={isSideNavbarOpen} toggleSideNavbar={toggleSideNavbar} />

      <img src={logo} alt="logo" className="logoImg" />
      <h1>FitMantra</h1>
      <ul>
        <li onClick={() => handleNavigation('slides')}>HOME</li>
        <li onClick={() => handleNavigation('about')}>ABOUT</li>
        <li onClick={() => handleNavigation('services')}>SERVICES</li>
        <li onClick={() => handleNavigation('contact')}>CONTACT US</li>
        <li onClick={() => handleNavigation('trainers')}>TRAINERS</li>

      </ul>
    </div>
  );
};

export default Header;
