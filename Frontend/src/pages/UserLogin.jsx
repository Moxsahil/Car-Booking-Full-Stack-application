import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [popupMessage, setPopupMessage] = useState(""); 
  const [showPopup, setShowPopup] = useState(false); 

  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  if (token) {
    navigate("/home");
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const userData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        userData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      
      setPopupMessage("Invalid email or password");
      setShowPopup(true);

      setTimeout(() => setShowPopup(false), 4000);
    }

    setEmail("");
    setPassword("");
  };

  return (
    <div className="flex flex-col justify-between min-h-screen bg-gray-100 p-4">
      {/* Popup Message */}
      {showPopup && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300">
          {popupMessage}
        </div>
      )}

      {/* Main Content */}
      <div className="flex flex-col items-center mt-10">
        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h1 className="text-lg font-semibold mb-4">Login</h1>
          <h3 className="text-lg font-semibold mb-4">What's your Email?</h3>
          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm">
            <div className="flex items-center bg-gray-100 px-3">
              <span className="text-sm">E-mail</span>
            </div>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              required
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 outline-none"
            />
          </div>
          <div className="flex items-center border rounded-lg overflow-hidden mb-4 w-full max-w-sm">
            <div className="flex items-center bg-gray-100 px-3">
              <span className="text-sm">Password</span>
            </div>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              placeholder="password"
              className="flex-1 px-3 py-2 outline-none "
            />
          </div>
          <button className="w-full bg-black text-white py-2 rounded-lg font-medium mb-4 max-w-sm hover:bg-orange-500 hover:text-white transition-all duration-300">
            Sign In
          </button>
        </form>
        <div className="text-center text-gray-500 text-sm mb-4 max-w-sm">or</div>
        <div className="w-full flex flex-col gap-2 max-w-sm">
          <Link
            to="/signup"
            className="flex items-center justify-center border py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            New Here | Create an account
            <img
              src="newHere.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
          </Link>
        </div>
        {/* <div className="w-full flex flex-col gap-2 max-w-sm">
          <Link
            to="/captainLogin"
            className="flex items-center justify-center border py-2 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Sign in as Captain
            <img
              src="captain.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
          </Link>
        </div> */}
      </div>

      {/* Footer Text */}
      <div className="text-xs text-gray-500 justify-center mt-4 py-4">
        <p>
          By proceeding, you consent to get calls, WhatsApp or SMS messages,
          including by automated means, from MOX and its affiliates to the
          number provided.
        </p>
        <p className="mt-2 justify-center">
          This site is protected by reCAPTCHA and the Google
          <a href="#" className="text-blue-500 underline ml-1">
            Privacy Policy
          </a>{" "}
          and
          <a href="#" className="text-blue-500 underline ml-1">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      </div>
    </div>
  );
};

export default UserLogin;