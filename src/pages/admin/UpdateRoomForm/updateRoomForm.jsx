import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UpdateRoomForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const room = location.state; // Room data passed via state

  // Ensure `room` exists before proceeding
  if (!room) {
    toast.error("No room data provided!");
    navigate("/admin/rooms");
    return null;
  }

  const [category, setCategory] = useState(room.category || "");
  const [maxGuests, setMaxGuests] = useState(room.maxGuests || 3);
  const [specialDescription, setSpecialDescription] = useState(
    room.specialDescription || ""
  );
  const [notes, setNotes] = useState(room.notes || "");
  const [photos, setPhotos] = useState(room.photos || []);
  const [newImages, setNewImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    toast.error("You must be logged in!");
    navigate("/login");
    return null;
  }

  const handleImageChange = (e) => {
    setNewImages(Array.from(e.target.files));
  };

  const handleRemovePhoto = (index) => {
    setPhotos((prevPhotos) => prevPhotos.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Upload new images if any
      let newImageUrls = [];
      if (newImages.length > 0) {
        const uploadPromises = newImages.map((image) =>
          uploadMedia(image).then((snapshot) => getDownloadURL(snapshot.ref))
        );
        newImageUrls = await Promise.all(uploadPromises);
      }

      // Combine old and new photos
      const updatedPhotos = [...photos, ...newImageUrls];

      // Prepare updated room data
      const updatedRoomData = {
        category,
        maxGuests,
        specialDescription,
        notes,
        photos: updatedPhotos,
      };

      // Send update request
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/room/${room.roomId}`,
        updatedRoomData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Room updated successfully!");
      navigate("/admin/rooms");
    } catch (err) {
      console.error("Error updating room:", err);
      toast.error("Failed to update room.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg"
      >
        <div>
          <label className="block text-gray-700">Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Max Guests:</label>
          <input
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(Number(e.target.value))}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
            min="1"
          />
        </div>

        <div>
          <label className="block text-gray-700">Special Description:</label>
          <textarea
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Notes:</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Existing Photos:</label>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative">
                <img
                  src={photo}
                  alt={`Room Photo ${index + 1}`}
                  className="w-20 h-20 object-cover rounded"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  title="Remove Photo"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-gray-700">Add New Photos:</label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isLoading ? (
            <div className="w-5 h-5 border-2 border-t-white border-blue-500 rounded-full animate-spin"></div>
          ) : (
            "Update Room"
          )}
        </button>
      </form>
    </div>
  );
}
