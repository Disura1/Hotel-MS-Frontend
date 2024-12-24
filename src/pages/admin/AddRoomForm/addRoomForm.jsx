import { useState, useEffect } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddRoomForm() {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [maxGuests, setMaxGuests] = useState(3);
  const [specialDescription, setSpecialDescription] = useState("");
  const [notes, setNotes] = useState("");
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
    return null; // Prevent further rendering
  }

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

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image/")
    );

    if (validFiles.length !== selectedFiles.length) {
      toast.error("Only image files are allowed.");
    }
    setImages(validFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      toast.error("Please select a category.");
      return;
    }

    setIsLoading(true);

    try {
      const imageUploadPromises = images.map((image) =>
        uploadMedia(image).then((snapshot) => getDownloadURL(snapshot.ref))
      );

      const imageUrls = await Promise.all(imageUploadPromises);
      const roomData = {
        category,
        maxGuests,
        specialDescription,
        notes,
        photos: imageUrls,
      };

      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/room",
        roomData,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );

      toast.success("Room added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add room.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Add New Room</h2>

        <div>
          <label htmlFor="category" className="block font-medium mb-1">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="maxGuests" className="block font-medium mb-1">
            Max Guests
          </label>
          <input
            id="maxGuests"
            type="number"
            value={maxGuests}
            onChange={(e) => setMaxGuests(Number(e.target.value))}
            className="w-full px-4 py-2 border rounded"
            required
            min="1"
          />
        </div>

        <div>
          <label htmlFor="specialDescription" className="block font-medium mb-1">
            Special Description
          </label>
          <textarea
            id="specialDescription"
            value={specialDescription}
            onChange={(e) => setSpecialDescription(e.target.value)}
            placeholder="Add special description here"
            className="w-full px-4 py-2 border rounded resize-none"
          />
        </div>

        <div>
          <label htmlFor="notes" className="block font-medium mb-1">
            Notes
          </label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add notes here"
            className="w-full px-4 py-2 border rounded resize-none"
          />
        </div>

        <div>
          <label htmlFor="images" className="block font-medium mb-1">
            Upload Images
          </label>
          <input
            id="images"
            type="file"
            multiple
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`bg-blue-500 px-4 py-2 rounded ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
          }`}
        >
          {isLoading ? "Submitting..." : "Add Rooms"}
        </button>
      </form>
    </div>
  );
}
