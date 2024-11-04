import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-scroll';
import './Navbar.css';
import logo from './logo.png'

function Navbar() {

  const [isOpen, setIsOpen] = useState(false);
  const navbarRef = useRef(null);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  }

  const handleClick = () => {
    console.log('Button clicked!');
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);

    return () => {
      document.removeEventListener('click', handleOutsideClick);
    }
  }, [navbarRef]);

  return (
    <div>
        <nav className="navbar" ref={navbarRef}>
            <Link to="Home" smooth={true} className="navbar__logo">
                <img src={logo} alt="taxi" style={{ width: 60, height: 60, marginRight: 20 }}/>
                BURGEON TOURS
            </Link>
            <div className={isOpen ? "navbar__items active" : "navbar__items"}>
                <div className='flex'></div>
                <Link to="Home" smooth={true} className="navbar__link" onClick={() => setIsOpen(false)}>Home</Link>
                <Link to="AboutUs" smooth={true} className="navbar__link" onClick={() => setIsOpen(false)}>About Us</Link>
                {/* <Link to="Home" smooth={true} className="navbar__link" onClick={() => setIsOpen(false)}>Gallery</Link> */}
                <Link to="ContactUs" smooth={true} className="navbar__link" onClick={() => setIsOpen(false)}>Contact Us</Link>
            </div>
            <a className="nav-tog" onClick={toggleNav}>
              <i className={isOpen ? "fa fa-times" : "fa fa-bars"}></i>
            </a>
        </nav>
    </div>
  )
}

export default Navbar
