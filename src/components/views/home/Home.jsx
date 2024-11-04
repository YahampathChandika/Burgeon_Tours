import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Home.css";
import image1 from "/images/vehicle-rent-colombo.png";
import image2 from "/images/bus-rent-colombo.png";
import image3 from "/images/van-rent-colombo.png";
import image4 from "/images/book-taxi-srilanka.png";


function Home() {

  const slides = [
    {
      id: 1,
      title: 'Slide 1',
      imageUrl: image1,
      alt: 'bus rent in colombo',
    },
    {
      id: 2,
      title: 'Slide 2',
      imageUrl: image2,
      alt: 'car rent in colombo',
    },
    {
      id: 3,
      title: 'Slide 3',
      imageUrl: image3,
      alt: 'van rent in colombo',
    },
    {
      id: 4,
      title: 'Slide 4',
      imageUrl: image4,
      alt: 'luxary bus rent in colombo',
    },
  ];
  

  const settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    fade: true,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section id="Home">
    <div className="con">
    <Slider {...settings}>
      {slides.map((slide) => (
        <div key={slide.id}>
          <img  className="BackgroundSlider-image" src={slide.imageUrl} alt={slide.alt} />
        </div>
      ))}
    </Slider>
    </div>
    </section>
  );
}

export default Home;
