import { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import toast from "react-hot-toast";
import Footer from "../../components/footer/footer.jsx";
import ContactUs from "../../components/contactUs/contactUs.jsx";
import ReviewSection from "../../components/reviews/reviews.jsx";
import CategoryCarousel from "../../components/categories/categories.jsx";
import Gallery from "../../components/gallery/gallery.jsx";

export default function HomePage() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load categories on mount
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
      .then((res) => {
        setCategories(res.data.categories || []);
      })
      .catch(() => {
        toast.error("Failed to load categories.");
      });
  }, []);

  // Book by category
  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to make a booking.");
      return;
    }

    if (!selectedCategory || !startDate || !endDate) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("Start date must be earlier than end date.");
      return;
    }

    setIsLoading(true);
    axios
      .post(
        import.meta.env.VITE_BACKEND_URL + "/api/booking/create-by-category",
        {
          category: selectedCategory,
          start: startDate,
          end: endDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        toast.success(res.data.message || "Booking created successfully!");
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Booking failed.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="relative w-full h-screen">
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-10 h-full bg-black bg-opacity-50">
          {/* Booking Section */}
          <div className="mt-[2850px] flex flex-col lg:flex-row justify-around items-center w-[80%] lg:w-[800px] h-auto lg:h-[120px] rounded-xl bg-gradient-to-r from-c1 via-c2 to-c3 p-4 shadow-lg">
            <div className="flex flex-col items-center w-full lg:w-auto mb-4 lg:mb-0">
              <label
                htmlFor="check-in"
                className="text-white font-semibold text-sm mb-1"
              >
                Check-in Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex flex-col items-center w-full lg:w-auto mb-4 lg:mb-0">
              <label
                htmlFor="check-out"
                className="text-white font-semibold text-sm mb-1"
              >
                Check-out Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />{" "}
            </div>
            <div className="flex flex-col items-center w-full lg:w-auto mb-4 lg:mb-0">
              <label
                htmlFor="room-type"
                className="text-white font-semibold text-sm mb-1"
              >
                Room Type
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>{" "}
            </div>

            <button
              onClick={handleBooking}
              disabled={isLoading}
              className={`${
                isLoading
                  ? "bg-blue-200 cursor-not-allowed"
                  : "bg-c1 hover:bg-c1 hover:text-white"
              } w-full lg:w-[150px] h-[40px] bg-white text-c1 font-bold rounded-full shadow-md transition-all duration-300 border border-white`}
            >
              {isLoading ? "Booking..." : "Book Now"}
            </button>
          </div>

          {/* Welcome Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl py-8 md:text-5xl text-c2 font-bold">
              Welcome to the hotel
            </h1>
          </div>

          {/* Call-to-Action */}
          <div className="flex justify-center py-5 space-x-14">
            <a href="#rooms" className="bg-[#00000000] border-[3px] text-white font-semibold px-6 py-3 rounded-md shadow-md hover:bg-c1 transition">
              Explore Rooms
            </a>
            <a href="#contact" className="bg-transparent border-[3px] border-white text-white font-semibold px-6 py-3 rounded-md hover:bg-c1 hover:text-white transition">
              Contact Us
            </a>
          </div>
          <section id="gallery">
            <Gallery />
          </section>
          <section id="rooms" className="w-full flex justify-center">
            <CategoryCarousel />
          </section>
          <section id="reviews" className="w-full flex justify-center">
            <ReviewSection />
          </section>
          <section id="contact" className="w-full flex justify-center">
            <ContactUs />
          </section>
          <Footer />
        </div>
      </div>
    </>
  );
}
