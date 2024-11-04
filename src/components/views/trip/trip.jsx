import React, { useState, useEffect } from "react";
import { Map, GoogleApiWrapper } from "google-maps-react";
import PlacesAutocomplete from "react-places-autocomplete";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './trip.css';
import car from "/images/car-book-colombo.png";
import van from "/images/van-book-colombo.png";
import bus from "/images/bus-book-colombo.png";
import luxary from "/images/luxary-bus-book-colombo.png";
import Modal from 'react-modal';
import { parsePhoneNumberFromString } from "libphonenumber-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserGroup } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2'


function trip() {
  
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [pickupDate, setPickupDate] = useState(null);
  const [dropDate, setDropDate] = useState(null);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [latitude1, setLatitude1] = useState(7.8731);
  const [latitude2, setLatitude2] = useState(null);
  const [longitude1, setLongitude1] = useState(80.7718);
  const [longitude2, setLongitude2] = useState(null);
  const [distance, setDistance] = useState(null);
  const [map, setMap] = useState(null);
  const [route, setRoute] = useState(null);
  const [amount, setAmount] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [name, setName] = useState('');
  const [passenger, setPassenger] = useState('');

  
  // const accountSid = 'ACdd3b6dfb08f44e8cc1370d5b10271c89';
  // const authToken = 'b49378105c4cc3679fe19529ad2bcba4';

  const handleSubmit = async (event) => {
    event.preventDefault();
    
     // Validate phone number before submitting the form
    const parsedPhoneNumber = parsePhoneNumberFromString(phone, "LK");
    if (name === "" ) {
      alert("Please enter your name");
      return;
    }
    else if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      setPhoneError("Invalid phone number");
      alert("Invalid phone number!");

      return;
    }  else if (passenger === "" ) {
      alert("Please enter passenger count");
      return;
    }
    
    const message = `Name: ${name}\nPhone: ${phone}\nPassengers: ${passenger}\nTrip Type: ${selectedOption}\nVehicle: ${selectedVehicle}\nPick Location: ${address1}\nDrop Location: ${address2}\nPick-up Date: ${pickupDate && pickupDate.toLocaleDateString()}\nDrop Date: ${dropDate && dropDate.toLocaleDateString()}\nDistance: ${distance} km\nAmount: ${amount} LKR`;
    const url = `https://wa.me/+94776080933?text=${encodeURIComponent(message)}`;
    window.open(url);

    setModalIsOpen(!modalIsOpen);

    Swal.fire({
      icon: 'success',
      title: 'Your Booking Completed!',
      text: "We will contact you soon",
      showConfirmButton: true,
    })

  };

  const toggleModal = () => {
    setModalIsOpen(!modalIsOpen);
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  }

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  }

  const calculateNumberOfDays = () => {
    if (pickupDate && dropDate) {
      const timeDiff = Math.abs(dropDate.getTime() - pickupDate.getTime());
      const numberOfDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return numberOfDays;
    }
  };

  const amountCalculate = () => {

    if (!selectedOption) {
      Swal.fire('Are you planing a one way or return trip? Please select')
      return;
    }

    if (!address1 || !address2) {
      Swal.fire('Please enter pickup and drop locations')
      return;
    }

    if (!pickupDate) {
      Swal.fire("Please enter pickup date")
      return;
    }
    
    if (!selectedVehicle) {
      Swal.fire('Please select a vehicle')
      return;
    }


    if (selectedVehicle === 'Car' && selectedOption === 'OneWay' && distance > 400) {
      setAmount((distance*120).toFixed(2));
    } else if (selectedVehicle === 'Car' && selectedOption === 'OneWay') {
        setAmount((distance*125).toFixed(2));
    
    } else if (selectedVehicle === 'Car' && selectedOption === 'Return' && distance > 400) {
        setAmount((distance*110*2).toFixed(2));
        setDistance((distance*2));
    } else if (selectedVehicle === 'Car' && selectedOption === 'Return') {
        setAmount((distance*115*2).toFixed(2));
        setDistance((distance*2));

    } else if (selectedVehicle === 'Van' && selectedOption === 'OneWay' && distance > 400) {
        setAmount((distance*230).toFixed(2));
    } else if (selectedVehicle === 'Van' && selectedOption === 'OneWay') {
        setAmount((distance*230).toFixed(2));
    
    } else if (selectedVehicle === 'Van' && selectedOption === 'Return' && distance > 400) {
        setDistance((distance*2));
        setAmount((distance*130*2).toFixed(2));
    } else if (selectedVehicle === 'Van' && selectedOption === 'Return') {
        setDistance((distance*2));
        setAmount((distance*140*2).toFixed(2));

    } else if (selectedVehicle === 'Bus' && selectedOption === 'OneWay' && distance > 400) {
        setAmount((distance*300).toFixed(2));
    } else if (selectedVehicle === 'Bus' && selectedOption === 'OneWay') {
        setAmount((distance*320).toFixed(2));

    } else if (selectedVehicle === 'Bus' && selectedOption === 'Return' && distance > 400) {
        setDistance((distance*2));
        setAmount((distance*170*2).toFixed(2));
    } else if (selectedVehicle === 'Bus' && selectedOption === 'Return') {
        setDistance((distance*2));
        setAmount((distance*175*2).toFixed(2));

    } else if (selectedVehicle === 'Luxary' && selectedOption === 'OneWay' && distance > 400) {
        setAmount((distance*450).toFixed(2));
    }  else if (selectedVehicle === 'Luxary' && selectedOption === 'OneWay') {
        setAmount((distance*520).toFixed(2));

    } else if (selectedVehicle === 'Luxary' && selectedOption === 'Return' && distance > 400) {
        setDistance((distance*2));
        setAmount((distance*270*2).toFixed(2));
    } else if (selectedVehicle === 'Luxary' && selectedOption === 'Return') {
        setDistance((distance*2));
        setAmount((distance*290*2).toFixed(2));
    }

    // else if (selectedVehicle === 'Car') {
    //   setAmount((distance*150).toFixed(2));
    // }
    // else if (selectedVehicle === 'Van') {
    //   setAmount((distance*220).toFixed(2));
    // }
    // else if (selectedVehicle === 'Bus') {
    //   setAmount((distance*250).toFixed(2));
    // }
    // else if (selectedVehicle === 'Luxary') {
    //   setAmount((distance*390).toFixed(2));
    // }
  }
  
  const handleCalculateDistance = (event) => {

      event.preventDefault();
      
      const start = new google.maps.LatLng(latitude1, longitude1);
      const end = new google.maps.LatLng(latitude2, longitude2);

      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();

      directionsRenderer.setMap(map);

      directionsService.route(
          {
              origin: start,
              destination: end,
              travelMode: google.maps.TravelMode.DRIVING
          },
          (response, status) => {
              if (status === 'OK') {
                  directionsRenderer.setDirections(response);
                  setRoute(response.routes[0]);

                  const routeDistance = response.routes[0].legs.reduce((sum, leg) => {
                      return sum + leg.distance.value;
                  }, 0);

                  setDistance(routeDistance / 1000); // convert to km
              } else {
                  console.error(`Directions service failed with status: ${status}`);
              }
          }
      );
  };

  const handlePhoneChange = (event) => {
    const phoneNumber = event.target.value;
    setPhone(phoneNumber);

    // Validate phone number in real-time and show error message
    const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "LK");
    if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
  };

  useEffect(() => {
      const mapOptions = {
          zoom: 7.15,
          center: new google.maps.LatLng(latitude1, longitude1)
      };

      setMap(new google.maps.Map(document.getElementById('map'), mapOptions));
  }, [latitude1, longitude1]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const tripVehicleCard = document.querySelector('.trip-vehicle');
      const bookBtn = document.querySelector('.book-btn');
      const trippopup = document.querySelector('.trip-popup');
      const triptype = document.querySelector('.trip-type');

      if (
        tripVehicleCard &&
        !tripVehicleCard.contains(event.target) &&
        bookBtn &&
        !bookBtn.contains(event.target) &&
        trippopup &&
        !trippopup.contains(event.target) 
      ) {
        setSelectedVehicle(null);
      }
      else if (
        triptype &&
        triptype.contains(event.target)
      )
      {
        setSelectedVehicle(null);
      }
    };
  
    document.addEventListener('click', handleClickOutside);
  
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  const handleSelect1 = async (value) => {
    setAddress1(value);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&components=country:LK&key=AIzaSyDmxdxATKt2gy3EUHGNaFWL6MR_snF75U8`
    );
    const data = await response.json();

    setLatitude1(data.results[0].geometry.location.lat);
    setLongitude1(data.results[0].geometry.location.lng);
  };

  const handleSelect2 = async (value) => {
    setAddress2(value);

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${value}&components=country:LK&key=AIzaSyDmxdxATKt2gy3EUHGNaFWL6MR_snF75U8`
    );
    const data = await response.json();

    setLatitude2(data.results[0].geometry.location.lat);
    setLongitude2(data.results[0].geometry.location.lng);
  };

  return (
    
    <div className='main-con'>
      <div className='top-bot-con'>
      <div className='trip-top'>
      <div className='trip-head'>
        Plan Your Trip Today!     
      </div>

      <div className='trip-type'>
        <label>
          <input 
            type="radio"
            name="options"
            value="OneWay"
            checked={selectedOption === 'OneWay'}
            onChange={handleOptionChange}
          />
          One Way Trip
        </label>
        <label>
          <input 
            type="radio"
            name="options"
            value="Return"
            checked={selectedOption === 'Return'}
            onChange={handleOptionChange}
          />
          Return Trip
        </label>
      </div>

      <div className='trip-location'>
        <label>
          <span className="location-text">Pick-up Location</span>
          <PlacesAutocomplete 
            value={address1} 
            onChange={setAddress1} 
            onSelect={handleSelect1}
            searchOptions={{ componentRestrictions: { country: "lk" } }}
          > 
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div>
                <input {...getInputProps({ placeholder: "eg: Colombo" })} />
                <div>
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </label>

        <label>
          <span className="location-text">Drop Location</span>
          <PlacesAutocomplete 
            value={address2} 
            onChange={setAddress2} 
            onSelect={handleSelect2}
            searchOptions={{ componentRestrictions: { country: "lk" } }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              
              <div>
                <input {...getInputProps({ placeholder: "eg: Galle" })} />
                <div>
                  {loading ? <div>Loading...</div> : null}
                  {suggestions.map((suggestion) => {
                    const style = {
                      backgroundColor: suggestion.active ? "#41b6e6" : "#fff",
                    };
                    return (
                      <div {...getSuggestionItemProps(suggestion, { style })}>
                        {suggestion.description}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
        </label>
      </div>
      <div className="trip-date">
        <label>
              <span className="trip-date-text">Pick-up date:</span>
              <DatePicker 
                className="date-picker"
                id="date-picker1"
                selected={pickupDate}
                onChange={date => setPickupDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={new Date()}   
              />
        </label>
        <label>
              <span className="trip-date-text">Drop date:</span>
              <DatePicker
                id="date-picker2"
                selected={dropDate}
                onChange={date => setDropDate(date)}
                dateFormat="dd/MM/yyyy"
                minDate={pickupDate}
              />
        </label>
      </div>
      <div className='trip-vehicle'>
        <label>Choose Your Vehicle</label>
        <div className="trip-vehicle-card">

        <label>
          <div className={`vehicle ${selectedVehicle === 'Car' ? 'selected' : ''}`}>
            <input 
              type="radio"
              name="vehicle"
              value="Car"
              checked={selectedVehicle === 'Car'}
              onChange={handleVehicleChange}
              onClick={handleCalculateDistance}
              style={{ display: 'none' }} 
            />
            <img className="vehicle-img" src={car} alt="car-book"/>
            <p className="vehicle-name">Car</p>
            <p className="vehicle-passengers"><FontAwesomeIcon icon={faUserGroup} /> 04</p>
          </div>
          </label>

          <label>
          <div className={`vehicle ${selectedVehicle === 'Van' ? 'selected' : ''}`}>
            <input 
              type="radio"
              name="vehicle"
              value="Van"
              checked={selectedVehicle === 'Van'}
              onChange={handleVehicleChange}
              onClick={handleCalculateDistance}
              style={{ display: 'none' }} 
            />
            <img className="vehicle-img" src={van} alt="van-book"/>
            <p className="vehicle-name">Van</p>
            <p className="vehicle-passengers"><FontAwesomeIcon icon={faUserGroup} /> 14</p>
          </div>
          </label>

          <label>
          <div className={`vehicle ${selectedVehicle === 'Bus' ? 'selected' : ''}`}>
            <input 
              type="radio"
              name="vehicle"
              value="Bus"
              checked={selectedVehicle === 'Bus'}
              onChange={handleVehicleChange}
              onClick={handleCalculateDistance}
              style={{ display: 'none' }} 
            />
            <img className="vehicle-img" src={bus} alt="bus-book"/>
            <p className="vehicle-name">Bus</p>
            <p className="vehicle-passengers"><FontAwesomeIcon icon={faUserGroup} /> 32</p>
          </div>
          </label>

          <label>
          <div className={`vehicle ${selectedVehicle === 'Luxary' ? 'selected' : ''}`}>
            <input 
              type="radio"
              name="vehicle"
              value="Luxary"
              checked={selectedVehicle === 'Luxary'}
              onChange={handleVehicleChange}
              onClick={handleCalculateDistance}
              style={{ display: 'none' }} 
            />
            <img className="vehicle-img" src={luxary} alt="luxary-bus-book"/>
            <p className="vehicle-name">Luxary</p>
            <p className="vehicle-passengers"><FontAwesomeIcon icon={faUserGroup} /> 37</p>
          </div>
           </label>

        </div>
        <button className="trip-btn" onClick={amountCalculate}>Check Details</button>
      </div>
      </div>
      <div className="trip-bottom">
            {route && amount && selectedOption && (
            <div className="trip-bottom-text">Route Distance : {distance} km</div> )}
            {route && amount && selectedOption && (
            <div className="trip-bottom-text">Estimated Price : {amount} LKR</div> )}
            {route && amount && selectedOption && (calculateNumberOfDays()>2) &&(
            <div className="trip-bottom-night">(Night parking charges will be added if staying more than 3 nights.)</div> )}
            {route && amount && selectedOption &&
            <button className="book-btn" onClick={toggleModal}>Book Now !</button>
            }
      </div>

      <Modal isOpen={modalIsOpen} className="trip-popup">
        <button className="popup-close-btn" onClick={toggleModal}>X</button>
        <div className="popup-con">
          <h2>Trip Details</h2>
          <div className="popup-details">
            <label className="popup-details-left">Name :</label>
            <input className="popup-details-right" type="text" id="name-input" value={name} onChange={(event) => setName(event.target.value)}/>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Phone :</label>
            <input className="popup-details-right" type="tel" id="phone-input" value={phone} onChange={handlePhoneChange}/>
            {phoneError && <div className="error">{phoneError}</div>}
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Passengers :</label>
            <input className="popup-details-right" type="number" id="passenger-input" min="1" value={passenger} onChange={(event) => setPassenger(event.target.value)}/>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Trip Type :</label>
            <label className="popup-details-right">{selectedOption}</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Vehicle :</label>
            <label className="popup-details-right">{selectedVehicle}</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Pick Location :</label>
            <label className="popup-details-right">{address1}</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Drop Location :</label>
            <label className="popup-details-right">{address2}</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Pick-up Date :</label>
            <label className="popup-details-right">{pickupDate && pickupDate.toLocaleDateString()}</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Drop Date :</label>
            <label className="popup-details-right">{dropDate && dropDate.toLocaleDateString()}</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Distance :</label>
            <label className="popup-details-right">{distance} km</label>
          </div>
          <div className="popup-details">
            <label className="popup-details-left">Amount :</label>
            <label className="popup-details-right">{amount} LKR</label>
          </div>
          <div className="popup-details popup-btn">
            <button  type="submit" className="popup-book-btn" onClick={handleSubmit}>Book</button>
          </div>
        </div>
      </Modal>
      
    </div>
    <div clssname='gmap' id="map" style={{ width: '100%', height: '60vh' }}></div>
    </div>
  )
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDmxdxATKt2gy3EUHGNaFWL6MR_snF75U8"
})(trip);