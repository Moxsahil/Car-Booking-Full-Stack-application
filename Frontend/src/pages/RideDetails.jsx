import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RideDetails = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/user/logout");
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage("");
    } else {
      console.log("No message to send");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 overflow-hidden">
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

      {/* Map Section */}
      <div className="relative h-[40vh]">
        <iframe
          title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27888.810772897955!2d76.5710154!3d28.8955165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d83bfbffffffff%3A0xfdf11cda0895e60d!2sRohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1699379253679!5m2!1sen!2sin"
          className="w-full h-full"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Ride Details */}
      <div className="p-4 bg-white flex items-center justify-between">
        <h2 className="text-xl font-bold">Meet at the Pickup Point</h2>
        <span className="text-lg font-semibold bg-black text-white px-3 py-1 rounded-md">
          2 min
        </span>
      </div>
      <hr className="border-t border-gray-400" />

      <div className="flex items-center justify-end gap-4 mr-3 mt-5">
        <div className="flex flex-col items-center justify-center">
          <h1 className="ml-16 mr-2 text-2xl font-bold">Driver details</h1>
          <h3 className="ml-24 font-semibold text-gray-800 text-lg">Sunny jangra</h3>
          <p className="ml-3 text-gray-600">White Suzuki S-Presso LXI</p>
          <p className="ml-32 mr-3 text-gray-500 font-medium">ratings: 4.9</p>
        </div>
      </div>
      <div className="flex justify-around mt-6">
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
              🛡️
            </div>
            <span className="mt-2 text-sm">Safety</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
              📤
            </div>
            <span className="mt-2 text-sm">Share my trip</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-100 flex justify-center items-center">
              📞
            </div>
            <span className="mt-2 text-sm">Call driver</span>
          </button>
        </div>

      <div className="m-3 bg-blue-300 px-4 py-1 rounded-md shadow-md">
        <h2 className="text-2xl  font-bold mb-2">Arriving at:</h2>
        <p className="text-gray-800">Pickup Point: Rohtak, Haryana</p>
        <p className="text-gray-500">Nearby Landmark: Near Rohtak Railway Station</p>
      </div>

    
      <div className="absolute left-4 right-4  flex items-center bg-slate-200 rounded-md shadow-lg p-3">
        <input
          className="flex-grow bg-transparent border-none outline-none text-gray-800 placeholder-gray-500 px-3"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message..."
        />
        <button
          onClick={handleSend}
          aria-label="Send Message"
          className="p-2 bg-blue-500 rounded-md flex items-center justify-center text-white"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0L15 7.5m4.5 4.5L15 16.5"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RideDetails;
