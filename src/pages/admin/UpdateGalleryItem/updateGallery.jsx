import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "../../../utils/mediaUpload.js"; // ✅ Named import
import axios from "axios";
import toast from "react-hot-toast";

export default function UpdateGalleryItemForm() {
  const navigate = useNavigate();
  const location = useLocation();

  if (!location.state) {
    window.location.href = "/admin/galleryItems";
  }

  const [name, setName] = useState(location.state.name);
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const galleryId = location.state._id;
      let imageUrl = location.state.image; // ✅ Keep existing image by default

      // 🔹 If new image selected → upload to Supabase
      if (image) {
        const fileName = `gallery/${Date.now()}_${image.name.replace(/\s+/g, "-")}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("Images")
          .upload(fileName, image, {
            upsert: false,
            contentType: image.type,
            cacheControl: "3600",
          });

        if (uploadError)
          throw new Error(`Upload failed: ${uploadError.message}`);

        const {
          data: { publicUrl },
          error: urlError,
        } = supabase.storage.from("Images").getPublicUrl(uploadData.path);

        if (urlError || !publicUrl) {
          throw new Error(
            `Failed to get image URL: ${urlError?.message || "Unknown error"}`,
          );
        }

        imageUrl = publicUrl; // ✅ Use new image URL
      }

      // 🔹 Send update to backend
      const galleryItemInfo = {
        name,
        description,
        image: imageUrl,
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${galleryId}`,
        galleryItemInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Gallery item updated successfully!");
      navigate("/admin/galleryItems");
    } catch (error) {
      console.error("❌ Update gallery error:", error);
      toast.error("Failed: " + error.message);
    } finally {
      // ✅ Always stop loading
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-4 text-center">
          Update Gallery Item
        </h2>

        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter item name"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter item description"
            className="w-full px-4 py-2 border rounded resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Image <span className="text-gray-500 text-sm">(optional)</span>
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded"
          />
          {location.state.image && !image && (
            <p className="text-sm text-gray-600 mt-1">
              Current:{" "}
              <a
                href={location.state.image}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                View Image
              </a>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span className="text-white">Update Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
