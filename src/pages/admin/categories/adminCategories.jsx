import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminCategories() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [categories, setCategories] = useState([]);
  const [categoriesAreLoaded, setCategoriesAreLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesAreLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          console.log(res.data.categories);
          setCategories(res.data.categories);
          setCategoriesAreLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoriesAreLoaded]);

  function handleDelete(name) {
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/category/" + name, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setCategoriesAreLoaded(false);
        toast.success("Category deleted successfully");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  }
  function handlePlusClick() {
    navigate("/admin/add-category");
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
              Price
            </th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">
              Features
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
          {categories.map((category, index) => (
            <tr
              key={index}
              className={`hover:bg-indigo-50 transition-all duration-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-6 py-4 border-b border-gray-200">
                {category.name}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                Rs: {category.price}.00
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                <ul className="list-inside list-disc space-y-1">
                  {category.features.map((feature, i) => (
                    <li key={i} className="text-gray-600">
                      {feature}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {category.description}
              </td>
              <td className="px-6 py-4 border-b border-gray-200">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="h-16 w-16 object-cover rounded-lg shadow-sm"
                    onError={(e) => (e.target.src = "path-to-default-image")} // Fallback if image not found
                  />
                ) : (
                  <span className="text-gray-500">No Image</span>
                )}
              </td>

              <td className="px-6 py-4 border-b border-gray-200 flex items-center justify-start space-x-4">
                <Link
                  to={"/admin/update-category"}
                  state={category}
                  className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition duration-200"
                >
                  <FaEdit className="text-xl" />
                </Link>
                <button
                  onClick={() => handleDelete(category.name)}
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
