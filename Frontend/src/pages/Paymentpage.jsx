import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const { ride, ridePrices } = location.state || {};
  const [passengername, setPassengername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  if (!ride) {
    navigate("/home", { replace: true });
    console.log(state);
    return null;
  }

  const handlePayment = async () => {
    if (!passengername.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!mobile.trim()) {
      toast.error("Please enter your mobile number.");
      return;
    }
    if (!/^\d{10}$/.test(mobile.trim())) {
      toast.error("Please enter a valid 10-digit mobile number.");
      return;
    } 
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(ridePrices).toFixed(2).replace(" ", ""),
        }),
      });

      const data = await response.json();
      handlePaymentVerify(data.data);

      if (response.ok) {
        console.log("Payment initiated successfully.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Payment initiation failed. Please try again.");
    }
  };

  const handlePaymentVerify = async (data) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: data.amount,
      currency: data.currency,
      name: "MOKSH Travel",
      description: "Test Payment",
      order_id: data.id,
      handler: async (response) => {
        try {
          const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/verify`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
            }),
          });

          const verifyData = await res.json();

          if (verifyData.message) {
            toast.success(verifyData.message);
            navigate("/ridedetails", { state: { ride, passengername, mobile }, replace:true });
          }
        } catch (err) {
          console.error(err);
          toast.error("Payment verification failed. Please try again.");
        }
      },
    };

    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div className="h-screen bg-white p-4 mt-4">
      {/* Header */}
      <header className="text-center text-xl font-semibold mb-6">Payment Page </header>

      {/* Ride Details */}
      <div className="bg-orange-500 rounded-lg p-6 shadow-md mb-8 flex items-center">
        <img src={ride.image} alt={ride.name} className="w-20 h-20 mt-2 mr-4"/> 
        <div className="flex-grow text-right">
          <div className="text-sm font-medium text-white">Selected Ride</div>
          <div className="text-lg font-bold mt-2 text-white">{ride.name}</div>
          <div className="text-lg text-white">Capacity: {ride.capacity}</div>
          <div className="text-lg text-white">Price: ₹{parseFloat(ridePrices).toFixed(2)}</div>
        </div>
      </div>

      <div className="bg-blue-400 rounded-lg p-6 shadow-md mb-6">
        <div className="text-sm font-medium text-gray-700 mb-4">Passenger Details</div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 rounded-lg" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            required
            value={passengername}
            onChange={(e) => setPassengername(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mobile">
            Mobile No
          </label>
          <input
            type="number"
            id="mobile"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email(optional)
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="font-bold shadow appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
      </div>

      {/* Payment Button */}
      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 gap-3 rounded bg-white p-4 w-full">
        <button
          onClick={handlePayment}
          className="bg-black text-white px-3 py-3 rounded-lg w-full hover:bg-blue-500"
        >
          Confirm and Pay
        </button>
        <Toaster />
      </div>
    </div>
  );
};

export default PaymentPage;
