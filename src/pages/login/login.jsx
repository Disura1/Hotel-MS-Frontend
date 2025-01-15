import { useState } from "react";
import axios from "axios";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa"; // Importing icons
import { RiArrowGoBackLine } from "react-icons/ri";
import toast from "react-hot-toast";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [phone, setPhone] = useState("");

  // Handle login
  const handleLogin = () => {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
        email,
        password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        if (res.data.user.type === "Customer") {
          window.location.href = "/";
        } else if (res.data.user.type === "Admin") {
          window.location.href = "/admin/";
        }
        toast.success("Welcome")
      })
      .catch((err) => {
        console.error(err);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  // Handle signup
  const handleSignup = () => {
    axios
      .post(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        email,
        password,
        firstName,
        lastName,
        whatsapp,
        phone,
      })
      .then((res) => {
        toast.success("Signup successful! Please login")
        setIsLogin(true); // Switch to Login view after signup
      })
      .catch((err) => {
        console.error(err);
        toast.error("Signup failed. Please try again.");
      });
  };

  // Toggle between login and signup
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setWhatsapp("");
    setPhone("");
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen bg-[url('/public/home-wall.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="relative z-10 flex flex-col items-center justify-center space-y-10 h-full w-full bg-black bg-opacity-50">
        <div className="bg-transparent w-[900px] h-[550px] flex">
          {/* Left Side (Form Section) */}
          <div
            className={`flex flex-col relative justify-center items-center w-[450px] h-[550px] backdrop-blur-md rounded-lg ${
              isLogin ? "order-1" : "order-2"
            }`}
          >
            <h1 className="absolute top-[30px] text-4xl text-center text-c1 font-bold">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            <input
              type="text"
              placeholder="Enter your email address"
              className="w-[85%] bg-transparent border-c1 border-[3px] text-white placeholder:text-gray-300 h-[40px] px-[10px] mb-5"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={
                isLogin ? "Enter your password" : "Create a password"
              }
              className="w-[85%] bg-transparent border-c1 border-[3px] text-white placeholder:text-gray-300 h-[40px] px-[10px] mb-5"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-[85%] bg-transparent border-c1 border-[3px] text-white placeholder:text-gray-300 h-[40px] px-[10px] mb-5"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-[85%] bg-transparent border-c1 border-[3px] text-white placeholder:text-gray-300 h-[40px] px-[10px] mb-5"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Whatsapp Number"
                  className="w-[85%] bg-transparent border-c1 border-[3px] text-white placeholder:text-gray-300 h-[40px] px-[10px] mb-5"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-[85%] bg-transparent border-c1 border-[3px] text-white placeholder:text-gray-300 h-[40px] px-[10px] mb-5"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </>
            )}

            <button
              className="absolute bottom-[30px] w-[40%] bg-blue-500 text-white text-xl h-[40px] rounded-full flex justify-center items-center hover:border-blue-500 hover:border-4 hover:bg-transparent hover:text-blue-500"
              onClick={isLogin ? handleLogin : handleSignup}
            >
              {isLogin ? (
                <>
                  <FaSignInAlt className="mr-2" /> Login
                </>
              ) : (
                <>
                  <FaUserPlus className="mr-2" /> Sign Up
                </>
              )}
            </button>
          </div>

          {/* Right Side (Toggle Button Section) */}
          <div
            className={`flex flex-col justify-center items-center text-[30px] hover:text-[40px] font-bold bg-c2 w-[450px] h-[550px] cursor-pointer ${
              isLogin ? "order-2" : "order-1"
            }`}
            onClick={toggleAuthMode}
          >
            {isLogin ? (
              <>
                <FaUserPlus className="mr-2" /> Sign Up
              </>
            ) : (
              <>
                <FaSignInAlt className="mr-2" /> Login
              </>
            )}
          </div>
        </div>
        <button
          onClick={() => {
            window.location.href = "/";
          }}
          className="flex items-center bg-c2 font-bold text- px-6 py-1 rounded-xl text-2xl hover:border-c2 hover:border-4 hover:bg-transparent hover:text-c2 hover:py-0 hover:px-5"
        >
          <RiArrowGoBackLine className="mr-2"/>
          Back to Home
        </button>
      </div>
    </div>
  );
}
