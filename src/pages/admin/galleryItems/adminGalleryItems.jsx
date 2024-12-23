import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminGalleryItems() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
  }

  const [galleryItems, setGalleryItems] = useState([]);
  const [galleryItemsIsLoaded, setGalleryItemsIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (!galleryItemsIsLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
        .then((res) => {
          console.log(res.data.list);
          setGalleryItems(res.data.list);
          setGalleryItemsIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [galleryItemsIsLoaded]);

  function handleDelete(id) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/gallery/" + id, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        setGalleryItemsIsLoaded(false);
        toast.success("Gallery item deleted successfully");
      })
      .catch((err) => {
        toast.error("Error deleting gallery item");
      });
  }

  function handlePlusClick() {
    navigate("/admin/add-gallery-item");
  }

  return (
    <div className="w-full py-6 px-4">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-c1 to-c2 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Name
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Description
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Image
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="text-gray-800 space-y-2">
          {galleryItems.map((item, index) => (
            <tr
              key={index}
              className={`hover:bg-indigo-50 transition-all duration-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 border-b border-gray-200">
                {item.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {item.description}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 object-cover rounded-lg shadow-sm"
                  />
                ) : (
                  "No Image"
                )}
              </td>
              <td className="px-6 py-4 border-b border-gray-200 flex items-center justify-start space-x-4">
                <Link
                  to={"/admin/update-gallery-item"}
                  state={item}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  <FaEdit className="text-xl" />
                </Link>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-200"
                >
                  <FaTrash className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handlePlusClick}
        className="bg-c3 rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:shadow-2xl transition duration-300 absolute bottom-6 right-11"
      >
        <FaPlus size={24} />
      </button>
    </div>
  );
}
