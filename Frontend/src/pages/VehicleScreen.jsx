import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VehicleScreen = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/user/logout");
  };

  const [selectedRide, setSelectedRide] = useState(null); 

  const rides = [
    {
      name: "CityFast",
      capacity: 4,
      time: "2 mins away",
      eta: "15:24",
      description: "Affordable, compact rides",
      price: "₹193.20",
      image: "https://www.svgrepo.com/show/408293/car-black.svg",
    },
    {
      name: "Moto",
      capacity: 1,
      time: "3 mins away",
      eta: "15:25",
      description: "Affordable motorcycle rides",
      price: "₹65.17",
      image: "https://www.svgrepo.com/show/101451/racing-motorbike.svg",
    },
    {
      name: "Premier",
      capacity: 4,
      time: "4 mins away",
      eta: "15:25",
      description: "Comfortable buses, for long journeys",
      price: "₹193.20",
      image: "https://www.svgrepo.com/show/278837/bus.svg",
    },
    {
      name: "Auto",
      capacity: 3,
      time: "2 mins away",
      eta: "15:24",
      description: "Affordable auto rides",
      price: "₹118.21",
      image: "https://www.svgrepo.com/show/22504/auto-ricksaw.svg",
    },
  ];

  const handleRideClick = (ride) => {
    setSelectedRide(ride.name); // Update selected ride
    navigate('/paymentpage', { state: { ride } }); // Pass ride data to the PaymentPage
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Map Section */}
      <div className="flex-grow relative">
      <h1 className="absolute top-16 right-5 text-2xl font-bold text-black z-50">MOKSH</h1>

      <div className="absolute top-5 right-5 flex items-center z-50">
  <button
    onClick={handleLogout}
    className="flex items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
  >
    <img
      src="https://www.svgrepo.com/show/529288/user-minus.svg" 
      alt="Logout Icon"
      className="w-6 h-6 mr-2" 
    />
    Logout
  </button>
</div>
        <div className="absolute inset-0 bg-gray-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27888.810772897955!2d76.5710154!3d28.8955165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d83bfbffffffff%3A0xfdf11cda0895e60d!2sRohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1699379253679!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            title="Map"
          ></iframe>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-white px-4 py-6 shadow-lg">
        <div className="space-y-4">
          {rides.map((ride, index) => (
            <div
              key={index}
              onClick={() => handleRideClick(ride)} // Add onClick handler
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors duration-300 ${
                selectedRide === ride.name
                  ? 'border-gray-900 bg-gray-100'
                  : 'border-gray-300 hover:border-blue-700'
              }`}
            >
              <img
                src={ride.image}
                alt={ride.name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{ride.name}</h3>
                  <span>{ride.price}</span>
                </div>
                <div className="text-sm text-gray-500">
                  {ride.time} • {ride.eta}
                </div>
                <div className="text-sm">{ride.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleScreen;
