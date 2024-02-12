import React, {useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";
import images from '../../constants/images';
import './Navbar.css';
import Logo from '../../assets/logoSVG';

const Navbar = () => {
  // State variable for checking if the page has been scrolled down
  const [isScrolled, setIsScrolled] = React.useState(false);

  // State variable for toggling the navigation menu on small screens
  const [toggleMenu, setToggleMenu] = React.useState(false);

  const [isHovered, setIsHovered] = useState(false);

  React.useEffect(() => {

    // Function to handle scrolling. Sets isScrolled state based on whether the page has been scrolled down
    const handleScroll = () => {
      const show = window.scrollY > 50;
      if (show !== isScrolled) setIsScrolled(show);
    };

    document.addEventListener('scroll', handleScroll); // Adds an event listener to handle scrolling

    return () => {
      document.removeEventListener('scroll', handleScroll); // Removes the event listener when the component unmounts
    };
  }, [isScrolled]); // Is run when isScrolled changes

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <button className="navbar-content" onClick={() => setToggleMenu(!toggleMenu)}>
        <GiHamburgerMenu className="navbar-content-icon" color="#fff" fontSize={30} />
        <span className='navbar-content-text'>MENU</span>
      </button>
      {toggleMenu && (
        <div className="navbar-content-menu flex__center slide-bottom">
          <button className="navbar-content-menu-close" onClick={() => setToggleMenu(false)}>
            <AiOutlineClose className="navbar-content-close-button" />
            <span className='navbar-content-close-button-text'>CLOSE</span>
          </button>
          <ul className="navbar-content-links">
            <li><a href="#about" onClick={() => setToggleMenu(false)}>Home</a></li>
            <li><a href="#paranoia" onClick={() => setToggleMenu(false)}>Paranoia</a></li>
            <li><a href="#trailer" onClick={() => setToggleMenu(false)}>Trailer</a></li>
            <li><a href="#projectfear" onClick={() => setToggleMenu(false)}>Project Fear</a></li>
            <li><a href="#newsletter" onClick={() => setToggleMenu(false)}>Contact</a></li>
          </ul>
        </div>
      )}
      <div className="navbar-logo">
        <Logo />
      </div>
      <button className="navbar-login-button" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <span className='navbar-login-text'>LOGIN</span>
        {isHovered ? <FaUnlock className='navbar-login-button-unlocked' /> : <FaLock className='navbar-login-button-locked'/>}
      </button>
    </nav>
  );
};

export default Navbar;