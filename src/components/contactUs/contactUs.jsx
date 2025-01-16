import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import MapComponent from "../map/MapComponent.jsx";
import React from "react";

const locations = [
  { lat: 7.0348983, lng: 79.9906769, name: "Hotel" }
];

export default function ContactUs() {
  return (
    <div className="flex mt-[50px] justify-around w-[95%] px-4 py-4 rounded-2xl bg-gray-400">
      <div className="w-[100%]">
        <div className="bg-c1 px-4 py-4 rounded-lg">
          <div className="flex flex-col">
            <h1 className="text-center font-bold text-xl mb-2">Inquiries</h1>
            <input
              className="bg-white mb-2 rounded-md p-2 placeholder-gray-600"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <textarea
              className="bg-white mb-2 rounded-md p-2 placeholder-gray-600"
              rows="3"
              name="reason"
              id="reason"
              placeholder="Put your reason here..."
            />
          </div>
          <div className="flex justify-around">
            <button
              className="bg-green-500 px-4 py-1 rounded-full"
              type="submit"
            >
              Submit
            </button>
            <button
              className="bg-yellow-600 px-6 py-1 rounded-full"
              type="reset"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex justify-around items-center mt-2">
          <h1 className="text-c1 font-extrabold">Contact Us On</h1>
          <div className="cursor-pointer flex items-center bg-c1 px-10 py-2 rounded-2xl">
            <MdEmail className="mr-10" size={30}/> hotel@gmail.com
          </div>
          <div className="cursor-pointer flex items-center bg-c1 px-10 py-2 rounded-2xl">
            <BsTelephoneFill className="mr-10" size={25}/> +94 112 345 678
          </div>
        </div>
      </div>
      <div class="h-[100%] w-2 bg-black mx-4"></div>
      <div className="w-[100%]">
        <MapComponent locations={locations} />
      </div>
    </div>
  );
}
