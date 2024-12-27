import { BsTelephoneFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import MapComponent from "../map/MapComponent.jsx";
import React from "react";

const locations = [
  { lat: 7.0348983, lng: 79.9906769, name: "Hotel" }
];

export default function ContactUs() {
  return (
    <div className="flex justify-around w-[95%] px-4 py-4 rounded-2xl bg-gray-400">
      <div className="w-[100%]">
        <h1 className="text-center font-extrabold mb-3 text-xl">Inquiries</h1>
        <div className="bg-c1 px-2 py-2 rounded-2xl">
          <div className="flex flex-col">
            <h1 className="text-center font-bold">Inquiries Form</h1>
            <label for="email">Email</label>
            <input
              className="bg-white mb-1 rounded-md p-1 placeholder-gray-600"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
            <label for="reason">Reason</label>
            <textarea
              className="bg-white mb-2 rounded-md p-1 placeholder-gray-600"
              rows="2"
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
          <div className="flex items-center bg-c1 px-10 py-2 rounded-2xl">
            <MdEmail className="mr-10" /> hotel@gmail.com
          </div>
          <div className="flex items-center bg-c1 px-10 py-2 rounded-2xl">
            <BsTelephoneFill className="mr-10" /> +94 112 345 678
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
