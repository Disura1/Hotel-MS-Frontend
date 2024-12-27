import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaTrash, FaUserCheck, FaUserSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminUsers() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [users, setUsers] = useState([]);
  const [usersAreLoaded, setUsersAreLoaded] = useState(false);
  const navigate = useNavigate();

  /*useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUsers(response.data.users || []); // Ensure it's an array
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);*/

  const fetchUsers = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, [usersAreLoaded]);

  const handleToggleStatus = (email, currentStatus) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`,
        {
          disabled: !currentStatus,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.email === email ? { ...user, disabled: !currentStatus } : user
          )
        );
        toast.success("User status updated");
      })
      .catch(() => {
        toast.error("Error updating user status");
      });
  };

  function handleDelete(email) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/users/" + email, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUsersAreLoaded(false);
        toast.success("User deleted successfully");
        fetchUsers();
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  /*function handleEnable(id) {
    axios
      .patch(
        import.meta.env.VITE_BACKEND_URL + "/api/users/enable/" + id,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setUsersAreLoaded(false);
        toast.success("User enabled successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }

  function handleDisable(id) {
    axios
      .put(
        import.meta.env.VITE_BACKEND_URL + "/api/users/" + id,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setUsersAreLoaded(false);
        toast.success("User disabled successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }*/

  return (
    <div className="w-full py-6 px-4">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-c1 to-c2 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              First Name
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Last Name
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Email
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Phone
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              WhatsApp
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Status
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 space-y-2">
          {users.map((user, index) => (
            <tr
              key={index}
              className={`hover:bg-indigo-50 transition-all duration-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 border-b border-gray-200">
                {user.firstName}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.lastName}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.email}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.phone}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.whatsapp}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {user.disabled ? "Disabled" : "Active"}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 flex items-center justify-start space-x-4">
                <div className="flex space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleStatus(user.email, user.disabled);
                    }}
                    className={`p-2 rounded-full transition ${
                      user.disabled
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {user.disabled ? (
                      <FaUserCheck size={20} />
                    ) : (
                      <FaUserSlash size={20} />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => handleDelete(user.email)}
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
