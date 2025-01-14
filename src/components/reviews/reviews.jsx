import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([
    {
      name: "John Doe",
      rating: 5,
      comment: "Amazing service! Highly recommend this place.",
      avatar: "https://i.pravatar.cc/50?img=1",
    },
    {
      name: "Jane Smith",
      rating: 4,
      comment: "Great experience, but the waiting time could be improved.",
      avatar: "https://i.pravatar.cc/50?img=2",
    },
    {
      name: "Alice Brown",
      rating: 5,
      comment: "The hospitality was outstanding. I'll visit again!",
      avatar: "https://i.pravatar.cc/50?img=3",
    },
  ]);

  const [newReview, setNewReview] = useState({
    name: "",
    rating: 0,
    comment: "",
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % reviews.length);
    }, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval);
  }, [reviews.length]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.rating && newReview.comment) {
      setReviews([
        ...reviews,
        { ...newReview, avatar: "https://i.pravatar.cc/50" },
      ]);
      setNewReview({ name: "", rating: 0, comment: "" });
    }
  };

  return (
    <div className="w-[95%] h-[350px] flex justify-around items-center bg-gray-400 p-4 rounded-2xl mt-[100px]">
      {/* Customer Reviews Section */}
      <div className="w-[65%] space-y-4 flex flex-col justify-center">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Customer Reviews
        </h2>
        <div className="relative overflow-hidden h-56">
          {reviews.map((review, index) => (
            <div
              key={index}
              className={`absolute transition-opacity duration-1000 ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ top: 0, left: 0, right: 0 }}
            >
              <div className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    {review.name}
                  </h3>
                  <div className="flex items-center space-x-1 text-yellow-500">
                    {Array.from({ length: review.rating }, (_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                  <p className="text-gray-600 mt-2">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Form Section */}
      <div className="bg-c1 p-4 rounded-lg w-[30%]">
      <form
        onSubmit={handleSubmit}
      >
        <h3 className="text-center font-bold text-xl mb-2">Add Your Review</h3>
        <input
          type="text"
          placeholder="Your Name"
          value={newReview.name}
          onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
          className="border border-gray-300 placeholder-gray-600 rounded-lg px-4 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1"
        />
        <div className="flex items-center space-x-2 mb-4 mt-2">
          <label className="font-medium text-white">Rating:</label>
          <div className="flex">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={`mr-4 cursor-pointer ${
                  newReview.rating > i ? "text-yellow-500" : "text-gray-300"
                }`}
                onClick={() => setNewReview({ ...newReview, rating: i + 1 })}
              />
            ))}
          </div>
        </div>
        <textarea
          placeholder="Your Comment"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="border border-gray-300 placeholder-gray-600 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-1"
          rows="3"
        ></textarea>
        <div className="flex justify-around">
          <button className="bg-green-500 px-4 py-1 rounded-full" type="submit">
            Submit
          </button>
          <button className="bg-yellow-600 px-6 py-1 rounded-full" type="reset">
            Reset
          </button>
        </div>
      </form>
      </div>
    </div>
  );
};

export default ReviewSection;
