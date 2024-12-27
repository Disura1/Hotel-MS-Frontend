import axios from "axios";
import { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";

export default function AdminRooms() {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchRooms = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/room")
      .then((res) => {
        console.log(res.data);
        setRooms(res.data.rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = (roomId) => {
    if (token == null) {
      window.location.href = "/login";
    }

    if (!confirm("Are you sure you want to delete this room?")) return;
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/api/room/${roomId}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Room deleted successfully");
        fetchRooms();
      })
      .catch(() => {
        toast.error("Error deleting room");
      });
  };

  const handleToggleAvailability = (roomId, currentStatus) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/room/${roomId}`,
        {
          available: !currentStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        toast.success("Room availability updated");
        fetchRooms();
      })
      .catch(() => {
        toast.error("Error updating room availability");
      });
  };

  return (
    <div className="w-full">
      <button
        className="bg-blue-600 text-white w-14 h-14 rounded-full flex justify-center items-center fixed bottom-5 right-5 shadow-lg hover:bg-blue-700 transition"
        onClick={() => {
          navigate("/admin/add-room");
        }}
      >
        <FaPlus />
      </button>
      <div className="w-full py-6 px-4">
        <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
          <thead className="bg-gradient-to-r from-c1 to-c2 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Room ID</th>
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Category</th>
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Max Guests</th>
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Available</th>
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Special Description</th>
              <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                key={room.roomId}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100 transition`}
              >
                <td className="px-6 py-4">{room.roomId}</td>
                <td className="px-6 py-4">{room.category}</td>
                <td className="px-6 py-4">{room.maxGuests}</td>
                <td className="px-6 py-4">{room.available ? "Yes" : "No"}</td>
                <td className="px-6 py-4">
                  {room.specialDescription || "N/A"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleAvailability(room.roomId, room.available);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      {room.available ? <FaToggleOn size={30}/> : <FaToggleOff size={30}/>}
                    </button>
                    <button
                      onClick={() => {
                        navigate("/admin/update-room", { state: room });
                      }}
                      className="text-green-500 hover:text-green-700 transition"
                    >
                      <FaEdit size={25}/>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(room.roomId);
                      }}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <FaTrash size={20}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
