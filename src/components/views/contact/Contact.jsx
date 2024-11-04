import React, { useRef, useState } from "react";
import './Contact.css'
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faHeadset, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';



function Contact() {

    const formRef = useRef();
    const [form, setForm] = useState({
      name: "",
      email: "",
      message: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { target } = e;
        const { name, value } = target;
    
        setForm({
          ...form,
          [name]: value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.email || !form.message) {
          alert("Please fill in all fields before sending.");
          return;
      }
  
        setLoading(true);
    
        emailjs
          .send(
            'service_gkxwd7f',
            'template_qcpj1vb',
            {
              from_name: form.name,
              to_name: "Yahampath Chandika",
              from_email: form.email,
              to_email: "yhmpth@gmail.com",
              message: form.message,
            },
            'JI8nDLvbkDSIe9eHT'
          )
          .then(
            () => {
              setLoading(false);
              alert("Thank you. We will get back to you as soon as possible.");
    
              setForm({
                name: "",
                email: "",
                message: "",
              });
            },
            (error) => {
              setLoading(false);
              console.error(error);
    
              alert("Ahh, something went wrong. Please try again.");
            }
          );
      };

  return (
    <section id="ContactUs">
    <div className='contact-con'>
        <div className='contact-header'>
            Contact Us
        </div>
        <div className='contact-options'>
            <div className='email-con'>
                <h1 className='con-name'>Get in touch</h1>
                <p>We would love to hear from you. Get in touch with us by email.</p>
                
                <form 
                    ref={formRef}
                    onSubmit={handleSubmit}
                    className='email'>
                        <input
                            type='text'
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            placeholder="What's your good name?"
                        />
                        <input
                            type='email'
                            name='email'
                            value={form.email}
                            onChange={handleChange}
                            placeholder="What's your email?"
                        />
                        <textarea
                            rows={7}
                            name='message'
                            value={form.message}
                            onChange={handleChange}
                            placeholder="What you want to say?"
                        />
                        <button
                            type='submit'
                        >
                           {loading ? "Done!" : "Send"} 
                        </button>
                </form>
            </div>
            <div className='hotline'>
              <h1 className='con-name'>Hotlines</h1>
              <p>Call us today to reserve your ride.</p>
              <div className='phn-con'>
                <div className="phn-con-name">
                  <FontAwesomeIcon icon={faHeadset} />                    
                  <h2 className="hot-name">General Inquiries</h2>
                </div>
                <a href="tel:+94717080933" className="hot-num">+94 77 508 0033</a>
              </div>
              <div className='phn-con'>
                <div className="phn-con-name">
                  <FontAwesomeIcon icon={faPhone} />                    
                  <h2 className="hot-name">Business Inquiries</h2>
                </div>
                <a href="tel:+94776080933" className="hot-num">+94 71 588 9733</a>
              </div>
              <div className='phn-con'>
                <div className="phn-con-name">
                  <FontAwesomeIcon icon={faEnvelope} />                    
                  <h2 className="hot-name">Email</h2>
                </div>
                <a href="mailto:info@burgeon.com" className="hot-num">info@burgeonlk.com</a>
              </div>
              <div className='phn-con'>
                <div className="phn-con-name">
                  <FontAwesomeIcon icon={faFacebook} />                    
                  <h2 className="hot-name">FaceBook</h2>
                </div>
                <a href="https://www.facebook.com/BURGEONTOURSSL" className="hot-num">BURGEON TOURS</a>
              </div>
            </div>

        </div>
    </div>
    </section>

  )
}

export default Contact