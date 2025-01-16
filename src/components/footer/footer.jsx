import {
  FaFacebook,
  FaInstagramSquare,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full px-4 py-4 bg-c1 bottom-0">
      <h1 onClick={() => {
            window.location.href = "http://localhost:5173/";
          }} className="cursor-pointer font-thin mb-2 text-xl">Hotel Management System</h1>
      <div className="flex w-full justify-around">
        <div>
          <h3 className="font-bold">Explore</h3>
          <ul>
            <li>
              <a href="#rooms">Room Categories</a>
            </li>
            <li>
              <a href="#gallery">Gallery</a>
            </li>
            <li>
              <a href="#reviews">Reviews</a>
            </li>
            <li>
              <Link to="">About Us</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Information</h3>
          <ul>
            <li>
              <Link to="">Privacy Policy & Security</Link>
            </li>
            <li>
              <Link to="">Terms & Conditions</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Get In Touch</h3>
          <ul>
            <li>
              <Link to="">Hotel Contact Information</Link>
            </li>
            <li>
              <Link to="">hotel@gmail.com</Link>
            </li>
            <li>
              <Link to="">+94 112 345 678</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold">Folow Us</h3>
          <div className="flex mt-4">
            <Link to="">
              <div className="w-10 h-10 mr-2 bg-c2 rounded-full flex items-center justify-center">
                <FaInstagramSquare size={26} className="text-black" />
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 mr-2 bg-c2 rounded-full flex items-center justify-center">
                <FaYoutube size={26} className="text-black" />
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 mr-2 bg-c2 rounded-full flex items-center justify-center">
                <FaFacebook size={26} className="text-black" />
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 mr-2 bg-c2 rounded-full flex items-center justify-center">
                <FaXTwitter size={26} className="text-black" />
              </div>
            </Link>
            <Link to="">
              <div className="w-10 h-10 bg-c2 rounded-full flex items-center justify-center">
                <FaLinkedin size={26} className="text-black" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
