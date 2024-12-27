import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const PaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { ride } = location.state || {};

  if (!ride) {
    navigate("/home", { replace: true });
    return null;
  }

  const handlePayment = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/payment/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: ride.price.replace("₹", ""),
        }),
      });

      const data = await response.json();
      handlePaymentVerify(data.data);

      if (response.ok) {
        console.log(data);
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
            navigate("/ridedetails", { state: { ride }, replace:true });
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
    <div className="h-screen bg-white p-4">
      {/* Header */}
      <header className="text-center text-xl font-semibold mb-6">Payment </header>

      {/* Ride Details */}
      <div className="bg-blue-500 rounded-lg p-4 shadow-md mb-6">
        <div className="text-sm font-medium text-white">Selected Ride</div>
        <div className="text-lg font-bold mt-2 text-white">{ride.name}</div>
        <div className="text-lg text-white">Capacity: {ride.capacity}</div>
        <div className="text-lg text-white">Price: {ride.price}</div>
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
