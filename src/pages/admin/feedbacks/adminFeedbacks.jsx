import axios from "axios";
import { useEffect, useState } from "react";
import { FaToggleOff, FaToggleOn } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminFeedbacks() {

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const [feedbacks, setFeedbacks] = useState([]);

  const fetchFeedbacks = () => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/feedbacks")
      .then((res) => {
        setFeedbacks(res.data.Feedbacks);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleToggleApproval = (feedback_ID, currentApproval) => {
    axios
      .put(
        `${import.meta.env.VITE_BACKEND_URL}/api/feedbacks/${feedback_ID}`,
        {
          approval: !currentApproval,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then(() => {
        toast.success("Feedback approval updated");
        fetchFeedbacks();
      })
      .catch(() => {
        toast.error("Error updating feedback approval");
      });
  };

  return (
    <div className="w-full py-6 px-4">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gradient-to-r from-c1 to-c2 text-white">
          <tr>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Feedback ID</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Guest Name</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Room Number</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Feedback Type</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Rating</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Comments</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Date</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Response</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Approval</th>
            <th className="px-6 py-4 text-left font-semibold text-sm uppercase tracking-wider border-b-2 border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks && feedbacks.length > 0 ? (
            feedbacks.map((feedback, index) => (
              <tr key={index} className={`hover:bg-indigo-50 transition-all duration-300 ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}>
                <td className="px-6 py-2">{feedback.feedback_ID}</td>
                <td className="px-6 py-2">{feedback.guest_Name}</td>
                <td className="px-6 py-2">{feedback.room_Number}</td>
                <td className="px-6 py-2">{feedback.feedback_type}</td>
                <td className="px-6 py-2">{feedback.rating}</td>
                <td className="px-6 py-2">{feedback.comments}</td>
                <td className="px-6 py-2">{feedback.date}</td>
                <td className="px-6 py-2">{feedback.response}</td>
                <td className="px-6 py-2">{feedback.approval ? "Yes" : "No"}</td>
                <td className="px-6 py-2">
                  <div className="flex space-x-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleApproval(feedback.feedback_ID, feedback.approval);
                      }}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      {feedback.approval ? <FaToggleOn size={40}/> : <FaToggleOff size={40}/>}
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="px-6 py-4 text-center">No feedbacks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}