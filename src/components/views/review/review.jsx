import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './review.css'
import image1 from "/images/car-rent.jpg";
import image2 from "/images/taxi-book.jpg";
import image3 from "/images/bus-rent.jpg";
import image4 from "/images/taxi-rent.jpg";
import image5 from "/images/van-rent.jpg";


const CustomerReviews = () => {
  const reviews = [
    {
      id: 1,
      name: 'Anuka Fonseka',
      review: 'Great service! Prompt and professional drivers.',
      image: image1,
      alt:'car-rent-colombo'

    },
    {
      id: 2,
      name: 'Sasmi Fernando',
      review: 'Excellent experience! Reliable and efficient service.',
      image: image2,
      alt:'vehicle-rent-colombo'
    },
    {
      id: 3,
      name: 'Charith Dilshan',
      review: 'Highly recommended! Courteous drivers and clean vehicles.',
      image: image3,
      alt:'bus-rent-colombo'
    },
    {
      id: 4,
      name: 'Rashmi Pasqual',
      review: 'I rely on this taxi company for all my transportation needs. Never disappointed.',
      image: image4,
      alt:'van-rent-colombo'
    },
    {
      id: 5,
      name: 'Dasiru Perera',
      review: 'Outstanding service! Punctual and comfortable rides.',
      image: image5,
      alt:'book-vehicle'
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="customer-reviews-con">  
      <div className="customer-reviews">
        <div className='customer-reviews-head'>Customer Reviews</div>
        <Slider {...settings}>
            {reviews.map((review) => (
            <div key={review.id} className="review-item">
                <div className="review-header">
                    <img className="review-image" src={review.image} alt={review.alt} />
                    <h3 className="review-name">{review.name}</h3>
                </div>
                <p className="review-text">{review.review}</p>
            </div>
            ))}
        </Slider>
        <a href="https://www.facebook.com/BURGEONTOURSSL" target="_blank" rel="noopener noreferrer"> 
            <button className="review-more">View More</button>
        </a>
      </div>
    </div>
  );
};

export default CustomerReviews;
