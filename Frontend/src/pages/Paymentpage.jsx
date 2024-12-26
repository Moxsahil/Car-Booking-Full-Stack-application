import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Paymentpage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUPIModal, setShowUPIModal] = useState(false);
  const navigate = useNavigate();

  const amountToPay = "100.00";  // Predefined payment amount
  const targetUPI = "7404927198@axisb";   // Replace with your UPI ID

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const toggleUPIModal = () => {
    setShowUPIModal(!showUPIModal);
  };

  const handleNavigateTopayment = () => {
    navigate("/ridedetails");
  };

  const redirectToUPIApp = (app) => {
    const amount = amountToPay;
    const upiId = targetUPI;

    switch (app) {
      case "paytm":
        window.location.href = `paytm://pay?pa=${upiId}&pn=YourName&mc=YourMerchantCode&tid=YourTransactionId&tr=${amount}&tn=Payment for service&am=${amount}&cu=INR`; 
        break;
      case "phonepe":
        window.location.href = `phonepe://upi/pay?pa=${upiId}&pn=YourName&mc=YourMerchantCode&tid=YourTransactionId&tr=${amount}&tn=Payment for service&am=${amount}&cu=INR`;
        break;
      case "googlepay":
        window.location.href = `googlepay://pay?pa=${upiId}&pn=YourName&mc=YourMerchantCode&tid=YourTransactionId&tr=${amount}&tn=Payment for service&am=${amount}&cu=INR`;
        break;
      case "cred":
        window.location.href = `cred://pay?pa=${upiId}&pn=YourName&mc=YourMerchantCode&tid=YourTransactionId&tr=${amount}&tn=Payment for service&am=${amount}&cu=INR`;
        break;
      default:
        break;
    }
  };

  return (
    <div className="h-screen bg-white p-4">
      {/* Header */}
      <header className="text-center text-xl font-semibold mb-6">My Wallet</header>

      <div className="bg-blue-500 rounded-lg p-4 shadow-md mb-6">
        <div className="text-sm font-medium text-white">Amount to Pay</div>
        <div className="text-3xl font-bold mt-2">₹100.00</div>
        {/* <button className="mt-4 bg-black text-white px-4 py-2 rounded-md flex items-center">
          <span className="text-xl mr-2"><i className="ri-gift-line"></i></span> Pay
        </button> */}
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Payment methods</h2>
        <button
          className="flex items-center text-blue-600 font-medium"
          onClick={toggleModal}
        >
          <span className="text-2xl mr-2">
            <i className="ri-bank-card-fill text-black"></i>
          </span>{" "}
          Add Credit Card/Debit Card
        </button>
        <button
          className="flex items-center text-blue-600 font-medium"
          onClick={toggleUPIModal}
        >
          <img
            src="https://cdn.iconscout.com/icon/free/png-256/free-upi-logo-icon-download-in-svg-png-gif-file-formats--unified-payments-interface-payment-money-transfer-logos-icons-1747946.png?f=webp"
            alt="UPI logo"
            className="w-8 h-8 mr-2" 
          />
          UPI
        </button>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Vouchers</h2>
        <button className="flex items-center text-blue-600 font-medium">
          <span className="text-2xl mr-2">+</span> Add voucher
        </button>
      </div>

      <div className="fixed bottom-3 left-1/2 transform -translate-x-1/2 gap-3 rounded bg-white p-4 w-full">
        <div className="flex-0"></div>
        <button
          onClick={handleNavigateTopayment}
          className="bg-black text-white px-3 py-3 rounded-lg w-full hover:bg-blue-500"
        >
          Confirm and pay
          <i className="ri-arrow-right-line"></i>
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add Payment Method</h3>
            <form>
              <input
                type="text"
                placeholder="Name on Card"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Card Number"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="Expiry Date"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <input
                type="text"
                placeholder="CVV"
                className="w-full p-2 border border-gray-300 rounded-md mb-4"
              />
              <div className="flex justify-between">
                <button
                  type="button"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={toggleModal}
                >
                  Cancel
                </button>
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showUPIModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Select UPI Payment Method</h3>
            <div className="grid grid-cols-2 gap-4">
              {/* Paytm */}
              <button
                className="bg-gray-200 p-2 rounded-md flex justify-center items-center"
                onClick={() => redirectToUPIApp("paytm")}
              >
                <img src="https://www.netmeds.com/images/cms/msite_-_paytm.png" alt="Paytm" className="w-12 h-12" />
                <span className="ml-2">Paytm</span>
              </button>
              {/* PhonePe */}
              <button
                className="bg-gray-200 p-2 rounded-md flex justify-center items-center"
                onClick={() => redirectToUPIApp("phonepe")}
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGS7BI4FzCUhLAHQLh6ZO6_LCcC_qd7A8IbQ&s"
                  alt="PhonePe"
                  className="w-12 h-12"
                />
                <span className="ml-2">PhonePe</span>
              </button>
              {/* Google Pay */}
              <button
                className="bg-gray-200 p-2 rounded-md flex justify-center items-center"
                onClick={() => redirectToUPIApp("googlepay")}
              >
                <img
                  src="https://www.svgrepo.com/show/353822/google-pay-icon.svg"
                  alt="Google Pay"
                  className="w-12 h-12"
                />
                <span className="ml-2">Google Pay</span>
              </button>
              {/* CRED */}
              <button
                className="bg-gray-200 p-2 rounded-md flex justify-center items-center"
                onClick={() => redirectToUPIApp("cred")}
              >
                <img src="https://www.svgrepo.com/show/504249/cred.svg" alt="CRED" className="w-12 h-12" />
                <span className="ml-2">CRED</span>
              </button>
            </div>
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={toggleUPIModal}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Paymentpage;
