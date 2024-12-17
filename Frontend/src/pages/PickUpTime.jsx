import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PickUpTime = () => {
  const navigate = useNavigate();

  const [customDate, setCustomDate] = useState("");
  const [customTime, setCustomTime] = useState("");
  const [dateOption, setDateOption] = useState("Today");
  const [timeOption, setTimeOption] = useState("Now");
  const [customHour, setCustomHour] = useState(""); 
  const [customMinute, setCustomMinute] = useState(""); 

  
  const handleDateChange = (e) => {
    const value = e.target.value;
    setDateOption(value);
    setCustomDate("");
    setCustomHour("");
    setCustomMinute("");
  };

  
  const handleTimeChange = (e) => {
    setTimeOption(e.target.value);
    setCustomHour("");
    setCustomMinute("");
  };

  
  const isConfirmDisabled = () => {
    if (dateOption === "Custom Date" && !customDate) return true; 
    if (
      (dateOption === "Tomorrow" || dateOption === "Custom Date" || timeOption === "Custom Time") &&
      (!customHour || !customMinute)
    )
      return true; 
    return false;
  };


  const handleConfirm = () => {
    if (isConfirmDisabled()) {
      alert("Please fill in all required fields before proceeding.");
      return;
    }
    navigate("/choosevehicle");
  };

  return (
    <div className="min-h-screen bg-white p-4">
      <h1 className="text-2xl font-bold mb-4">When do you want to be picked up?</h1>

      {/* Date Picker */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center border rounded-md p-3">
          <select className="flex-1 ml-3 bg-transparent focus:outline-none" value={dateOption} onChange={handleDateChange}>
            <option>Today</option>
            <option>Tomorrow</option>
            <option>Custom Date</option>
          </select>
        </div>

        {/* Custom Date Input */}
        {dateOption === "Custom Date" && (
          <div className="flex items-center border rounded-md p-3 mt-2">
            <input
              type="date"
              value={customDate}
              onChange={(e) => setCustomDate(e.target.value)}
              className="flex-1 bg-transparent focus:outline-none"
              required
            />
          </div>
        )}

        {/* Time Picker */}
        {dateOption === "Today" && (
          <div className="flex items-center border rounded-md p-3 mt-4">
            <select className="flex-1 ml-3 bg-transparent focus:outline-none" value={timeOption} onChange={handleTimeChange}>
              <option>Now</option>
              <option>In 15 minutes</option>
              <option>Custom Time</option>
            </select>
          </div>
        )}

        {/* Custom Time Input for Custom Time */}
        {(dateOption === "Tomorrow" || dateOption === "Custom Date" || timeOption === "Custom Time") && (
          <div className="flex space-x-4 items-center border rounded-md p-3 mt-2">
            <input
              type="number"
              placeholder="HH"
              min="0"
              max="23"
              value={customHour}
              onChange={(e) => setCustomHour(e.target.value)}
              className="w-1/2 text-center bg-transparent focus:outline-none border rounded p-2"
              required
            />
            <span>:</span>
            <input
              type="number"
              placeholder="MM"
              min="0"
              max="59"
              value={customMinute}
              onChange={(e) => setCustomMinute(e.target.value)}
              className="w-1/2 text-center bg-transparent focus:outline-none border rounded p-2"
              required
            />
          </div>
        )}
      </div>

      {/* Confirm Button */}
      <button
        className={`w-full text-lg py-3 rounded-md text-white ${
          isConfirmDisabled() ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-blue-500"
        }`}
        onClick={handleConfirm}
        disabled={isConfirmDisabled()}
      >
        Confirm
      </button>
    </div>
  );
};

export default PickUpTime;
