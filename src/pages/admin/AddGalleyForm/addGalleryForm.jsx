import { useState } from "react";
import { supabase } from "../../../utils/mediaUpload.js"; // ✅ Named import
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddGalleryItem() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !description || !image) {
      toast.error("All fields are required!");
      return;
    }

    setIsLoading(true);

    try {
      // 🔹 Step 1: Upload image to Supabase Storage
      const fileName = `gallery/${Date.now()}_${image.name.replace(/\s+/g, "-")}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Images")
        .upload(fileName, image, {
          upsert: false,
          contentType: image.type,
          cacheControl: "3600",
        });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      // 🔹 Step 2: Get public URL
      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from("Images").getPublicUrl(uploadData.path);

      if (urlError || !publicUrl) {
        throw new Error(
          `Failed to get image URL: ${urlError?.message || "Unknown error"}`,
        );
      }

      // 🔹 Step 3: Send gallery item to backend
      const galleryItem = {
        name,
        description,
        image: publicUrl, // ✅ Supabase public URL
      };

      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/gallery`,
        galleryItem,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Gallery item added successfully!");
      navigate("/admin/galleryItems/");
    } catch (error) {
      console.error("❌ Add gallery error:", error);
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
        <h2 className="text-xl font-bold mb-4 text-center">Add Gallery Item</h2>

        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter gallery item name"
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
            placeholder="Enter description"
            className="w-full px-4 py-2 border rounded resize-none"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="image" className="block font-medium mb-1">
            Image
          </label>
          <input
            id="image"
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 flex justify-center"
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span className="text-white">Add Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
