import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./whatsapp.css";

function WhatsAppButton() {
  const handleClick = () => {
    const message = "Hello";
    const url = `https://wa.me/+94776080933?text=${encodeURIComponent(message)}`;
    window.open(url);
  };

  return (
    <div className="whatsapp-button" onClick={handleClick}>
      <FaWhatsapp className="whatsapp-icon" />
    </div>
  );
}

export default WhatsAppButton;
