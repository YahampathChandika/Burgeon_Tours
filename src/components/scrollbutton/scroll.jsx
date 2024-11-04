import React, { useState, useEffect } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa'; // Import the icon from the react-icons library
import  icon  from './circle-up-solid.svg';
import './scroll.css';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false); // State to track whether the button should be visible or not

  useEffect(() => {
    const toggleVisible = () => {
      if (window.pageYOffset > 300) { // If the user has scrolled down more than 300 pixels, show the button
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisible); // Add a scroll event listener to the window to track when the user scrolls

    return () => {
      window.removeEventListener('scroll', toggleVisible); // Remove the event listener when the component unmounts
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use smooth scrolling to animate the scroll
    });
  };

  return (
    <div className={`scroll-button ${visible ? 'show' : 'hide'}`}>

      {/* <FaArrowCircleUp onClick={scrollToTop} /> */}
      <img src={icon} style={{ width: 30, height: 30 }} onClick={scrollToTop}/>
    </div>
  );
};

export default ScrollButton;
