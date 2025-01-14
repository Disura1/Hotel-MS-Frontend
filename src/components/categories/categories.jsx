import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function CategoryCarousel() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [categories, setCategories] = useState([]);
  const [categoriesAreLoaded, setCategoriesAreLoaded] = useState(false);
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesAreLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          setCategories(res.data.categories);
          setCategoriesAreLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoriesAreLoaded]);

  function nextCategory() {
    setCurrentCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
  }

  function prevCategory() {
    setCurrentCategoryIndex(
      (prevIndex) => (prevIndex - 1 + categories.length) % categories.length
    );
  }

  return (
    <div className="w-[65%] py-6 px-4 mt-[90px] bg-gray-200 rounded-3xl">
      {/* Slide Show Container */}
      <div className="relative flex flex-row items-center justify-center">
        {/* Category Slide */}
        {categories.length > 0 && (
          <div className="w-full max-w-md bg-white rounded-lg shadow-2xl p-6">
            <div className="flex justify-center items-center">
              <img
                src={categories[currentCategoryIndex].image || "path-to-default-image"}
                alt={categories[currentCategoryIndex].name}
                className="h-64 w-64 object-cover rounded-lg shadow-sm"
              />
            </div>
            <h3 className="text-xl font-semibold text-center mt-4">
              {categories[currentCategoryIndex].name}
            </h3>
            <p className="text-center mt-2">{categories[currentCategoryIndex].description}</p>
            <div className="mt-4">
              <ul className="list-inside list-disc space-y-1 text-center">
                {categories[currentCategoryIndex].features.map((feature, i) => (
                  <li key={i} className="text-gray-600">
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <p className="text-center mt-4 text-lg font-semibold">Rs: {categories[currentCategoryIndex].price}.00</p>
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <button
                onClick={prevCategory}
                className="bg-gray-800 text-white p-2 border-8 border-white rounded-full hover:bg-gray-700 transition duration-200"
              >
                <FaChevronLeft size={34} />
              </button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <button
                onClick={nextCategory}
                className="bg-gray-800 text-white p-2 border-8 border-white rounded-full hover:bg-gray-700 transition duration-200"
              >
                <FaChevronRight size={34} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
