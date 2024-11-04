import React from 'react'
import './about.css'

function About() {
  return (
    <section id="AboutUs">
    <div className='about-con'>
      <div className='about-text-con'>
        <div className='about-text-head'>
          About Us
        </div>
        
        <div className='about-text-body'>
          Welcome to Burgeon Travels, the premier online platform for booking taxi rides in Colombo. 
          Our mission is to provide a fast, reliable, and convenient service that connects riders with trusted drivers, 
          making transportation in our city easier and more enjoyable than ever before.
          <br/>
          <br/>
          But we're more than just a technology company. We're a team of passionate and dedicated individuals 
          who are committed to delivering a world-class experience for our customers. Our drivers are carefully 
          vetted and trained to ensure the highest standards of safety and service, while our support team is 
          always available to assist you with any questions or concerns.
          <br/>
          <br/>
          Whether you're a local resident or a visitor to our country, we're here to make your transportation 
          experience as smooth and stress-free as possible. So why wait? Book your next ride with Burgeon Travels
          today and experience the future of taxi transportation!
        </div>
      </div>
      <div className='about-img-con'>
        <div className='about-img'></div>
      </div>
    </div>
    </section>
  )
}

export default About