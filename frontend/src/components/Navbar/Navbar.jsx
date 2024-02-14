import React, { useState } from 'react';
import Login from '../Login/Login';
import { GiHamburgerMenu } from 'react-icons/gi';
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import Logo from '../../assets/logoSVG';
import './Navbar.css';

const Navbar = ({mainComponentRef}) => {
  // State variable for checking if the page has been scrolled down
  const [isScrolled, setIsScrolled] = React.useState(false);

  // State variable for toggling the navigation menu on small screens
  const [toggleMenu, setToggleMenu] = React.useState(false);

  // State variable for checking if the icon should be rotated
  const [isRotated, setIsRotated] = useState(false);

  // State variable for checking if a button is hovered
  const [isHovered, setIsHovered] = useState(false);

  // State variable for showing the login popup
  const [showLogin, setShowLogin] = useState(false);


  React.useEffect(() => {
    const handleScroll = () => {
      if(mainComponentRef.current) {
        const show = mainComponentRef.current.getBoundingClientRect().bottom <= 200;
        console.log('handleScroll called, show:', show); // Add this line
        if (show !== isScrolled) setIsScrolled(show);
      }
    };

    document.addEventListener('scroll', handleScroll); // Adds an event listener to handle scrolling

    return () => {
      document.removeEventListener('scroll', handleScroll); // Removes the event listener when the component unmounts
    };
  }, [isScrolled, mainComponentRef]); // Is run when isScrolled changes

  const handleMenuToggle = () => {
    setToggleMenu(!toggleMenu);
    setIsRotated(!isRotated);
  };
  
  const handleLoginClick = () => {
    console.log('Login button clicked');
    setShowLogin(true);
  };
  
  const handleLoginClose = () => {
    setShowLogin(false);
  };

  const handleLogin = (username) => {

  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <button className={`navbar-content ${toggleMenu ? 'menu-open' : ''}`} onClick={handleMenuToggle}>
        <GiHamburgerMenu className={`navbar-content-icon ${toggleMenu ? 'menu-open' : ''}`} style={{ transform: isRotated ? 'rotate(90deg)' : '' }} color="#fff" fontSize={30} />
        <span className='navbar-content-text'>{toggleMenu ? 'CLOSE' : 'MENU'}</span>
      </button>
      {toggleMenu && (
        <div className="navbar-content-menu flex__center slide-bottom">
          <ul className="navbar-content-links">
            <li><a href="#about" onClick={() => setToggleMenu(false)}>Home</a></li>
            <li><a href="#paranoae" onClick={() => setToggleMenu(false)}>Paranoae</a></li>
            <li><a href="#dolor" onClick={() => setToggleMenu(false)}>Dolor</a></li>
            <li><a href="#ostracized" onClick={() => setToggleMenu(false)}>Ostracized</a></li>
            <li><a href="#whatliesbeyond" onClick={() => setToggleMenu(false)}>What Lies Beyond</a></li>
            <li><a href="#newsletter" onClick={() => setToggleMenu(false)}>Newsletter</a></li>
          </ul>
        </div>
      )}
      <div className="navbar-logo">
        <Logo />
      </div>
      <button className="navbar-login-button" onClick={handleLoginClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <span className='navbar-login-text'>LOGIN</span>
        {isHovered ? <FaUnlock className='navbar-login-button-unlocked' /> : <FaLock className='navbar-login-button-locked'/>}
      </button>
      {showLogin && <Login onClose={handleLoginClose} onLogin={handleLogin} />}
    </nav>
  );
};

export default Navbar;