import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Gallery() {
  const [galleryItems, setGalleryItems] = useState([]);

  useEffect(() => {
    // Fetch gallery items from the backend
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/gallery")
      .then((response) => {
        setGalleryItems(response.data.list);
      })
      .catch((err) => {
        console.error("Error fetching gallery items:", err);
      });
  }, []);

  return (
    <div className="w-full py-6 px-4 mt-[80px] bg-gray-200">
      {/* Gallery Section */}
      <h2 className="text-3xl font-bold text-c3 text-center mb-4">Our Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {galleryItems.map((item) => (
          <div
            key={item._id}
            className="relative bg-white rounded-lg shadow-xl overflow-hidden transform transition duration-300 hover:scale-105"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover"
            />
            <div className="absolute top-0 left-0 right-0 bottom-0 bg-black opacity-50 hover:opacity-0 transition duration-300"></div>
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white z-10">
              <h3 className="text-xl font-semibold">{item.name}</h3>
              <p className="mt-2">{item.description}</p>
              <Link
                to={`/gallery/${item._id}`}
                className="mt-4 inline-block text-yellow-400 hover:text-yellow-500 text-sm"
              >
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
