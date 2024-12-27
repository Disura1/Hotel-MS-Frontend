import React, { useState, useEffect } from "react";

const CategoryCarousel = () => {
  const [categories, setCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Fetch categories from the backend
    fetch("http://localhost:5000/api/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const nextCategory = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % categories.length);
  };

  const prevCategory = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + categories.length) % categories.length
    );
  };

  return (
    <div className="w-[95%] h-[350px] flex flex-col justify-center items-center bg-gray-100 p-4 rounded-2xl shadow-lg">
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
        Categories
      </h2>

      {/* Carousel */}
      {categories.length > 0 && (
        <div className="relative w-full h-56 flex items-center justify-center overflow-hidden">
          <button
            onClick={prevCategory}
            className="absolute left-4 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
          >
            ❮
          </button>

          <div className="w-[90%] flex flex-col items-center text-center space-y-4">
            <img
              src={categories[currentIndex].image || "/placeholder.jpg"}
              alt={categories[currentIndex].name}
              className="w-40 h-40 object-cover rounded-full border-4 border-blue-500 shadow-md"
            />
            <h3 className="text-lg font-semibold text-gray-800">
              {categories[currentIndex].name}
            </h3>
            <p className="text-gray-600">{categories[currentIndex].description}</p>
            <p className="text-green-700 font-bold">
              Price: ${categories[currentIndex].price}
            </p>
            <ul className="text-gray-600 list-disc list-inside">
              {categories[currentIndex].features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={nextCategory}
            className="absolute right-4 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-600"
          >
            ❯
          </button>
        </div>
      )}

      {/* No categories available */}
      {categories.length === 0 && (
        <p className="text-gray-600 text-lg">No categories available.</p>
      )}
    </div>
  );
};

export default CategoryCarousel;
