import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "./LocationSearchPanel";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("");

  const panelRef = useRef(null);
  const formRef = useRef(null);
  const panelCloseRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    navigate("/user/logout");
  };

  const handleLocationSelect = (location) => {
    if (pickup === "") {
      setPickup(location);
    } else {
      setDestination(location);
    }
    setPanelOpen(false);
  };

  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "61%",
        duration: 0.5,
        ease: "ease.out",
      });
      gsap.to(formRef.current, {
        y: "-180%",
        ease: "ease.out",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 1,
      });
      gsap.to(".label-to-top", { opacity: 1, duration: 0.3 });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(formRef.current, {
        y: "0%",
        duration: 0.5,
        ease: "power2.out",
      });
      gsap.to(panelCloseRef.current, {
        opacity: 0,
      });
      gsap.to(".label-to-top", { opacity: 0, duration: 0.3 });
    }
  }, [panelOpen]);

  const handleButtonClick = () => {
    if (pickup && destination) {
      navigate("/pickuptime");
    } else {
      alert("Please fill in both Pickup and Destination fields.");
    }
  };

  // Automatically detect current location and set Pickup field
  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const city =
              data.address.city || data.address.town || data.address.village;

            setPickup(city); // Set current location to Pickup input
          } catch (error) {
            console.error("Error fetching location:", error);
            alert("Could not detect your location. Please try again.");
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-screen bg-gray-100 relative overflow-hidden">
      <div className="w-full h-2/3 bg-gray-300 relative">
        <h1 className="absolute top-16 right-5 text-2xl font-bold text-blue-500 z-50">
          MOKSH
        </h1>

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

        <div className="absolute inset-0">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27888.810772897955!2d76.5710154!3d28.8955165!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d83bfbffffffff%3A0xfdf11cda0895e60d!2sRohtak%2C%20Haryana!5e0!3m2!1sen!2sin!4v1699379253679!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            title="Map"
          ></iframe>
        </div>
      </div>

      <div
        ref={formRef}
        className="w-full h-1/3 bg-white flex flex-col items-center px-4 relative transition-all duration-500 ease-in-out"
      >
        <h5
          ref={panelCloseRef}
          onClick={() => setPanelOpen(false)}
          className="absolute top-5 right-5 text-2xl font-bold"
        >
          <i className="ri-arrow-down-wide-fill"></i>
        </h5>
        <h2 className="text-lg font-semibold my-4">Find a trip</h2>

        <div className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="pickup" className="block text-gray-600 text-sm mb-2">
              Pick-up Location
            </label>
            <div className="flex">
              <input
                id="pickup"
                onClick={() => setPanelOpen(true)}
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                type="text"
                placeholder="Add a pick-up location"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
              />
              <button
                onClick={handleUseCurrentLocation}
                className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Use Current Location
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="destination"
              className="block text-gray-600 text-sm mb-2"
            >
              Destination
            </label>
            <input
              id="destination"
              onClick={() => setPanelOpen(true)}
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              type="text"
              placeholder="Enter your destination"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            onClick={handleButtonClick}
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            Choose pick-up time
          </button>
        </div>
      </div>

      <div
        ref={panelRef}
        className="panel bg-white w-full absolute bottom-0 left-0"
        style={{ height: "0%", overflow: "hidden" }}
      >
        <LocationSearchPanel onLocationSelect={handleLocationSelect} />
        <p className="text-white text-center mt-4"></p>
      </div>
    </div>
  );
};

export default Home;
