import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminBookings() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [bookings, setBookings] = useState([]);
  const [bookingsAreLoaded, setBookingsAreLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!bookingsAreLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/bookings", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setBookings(res.data.result);
          setBookingsAreLoaded(true);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [bookingsAreLoaded]);

  function handleDelete(bookingId) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/bookings/" + bookingId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setBookingsAreLoaded(false);
        toast.success("Booking deleted successfully");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error deleting booking");
      });
  }

  return (
    <div className="w-full py-6 px-4">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-c1 to-c2 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Booking ID
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Room ID
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Email
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Status
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Reason
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Start
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              End
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Notes
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Time
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 space-y-2">
          {bookings.map((booking, index) => (
            <tr
              key={index}
              className={`hover:bg-teal-50 transition-all duration-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 border-b border-gray-200">{booking.bookingId}</td>
              <td className="px-6 py-4 border-b border-gray-200">{booking.roomId}</td>
              <td className="px-6 py-4 border-b border-gray-200">{booking.email}</td>
              <td
                className={`px-6 py-4 border-b border-gray-200 ${
                  booking.status === "Pending"
                    ? "text-yellow-500"
                    : booking.status === "Confirmed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {booking.status}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {new Date(booking.start).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {new Date(booking.end).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 flex items-center space-x-4">
                <Link
                  to={"/admin/update-booking"}
                  state={booking}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  <FaEdit className="text-xl" />
                </Link>
                <button
                  onClick={() => handleDelete(booking.bookingId)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
                >
                  <FaTrash className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
