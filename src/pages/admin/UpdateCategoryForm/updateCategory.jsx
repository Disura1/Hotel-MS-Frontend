import { useState } from "react";
import { supabase, uploadMediaToSupabase } from "../../../utils/mediaUpload.js"; // named export
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function UpdateCategoryForm() {
  const navigate = useNavigate();
  const location = useLocation();
  if (location.state == null) {
    window.location.href = "/admin/categories";
  }
  const [name, setName] = useState(location.state.name);
  const [price, setPrice] = useState(location.state.price);
  const [features, setFeatures] = useState(location.state.features.join(","));
  const [description, setDescription] = useState(location.state.description);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  console.log(location.state);

  const token = localStorage.getItem("token");
  console.log("Token:", token);
  if (token == null) {
    window.location.href = "/login";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const featuresArray = features
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f);
      const categorySlug = location.state.name; // or use ID if your API expects it

      // 🔹 Case 1: No new image → update with existing image URL
      if (!image) {
        const categoryInfo = {
          name, // ✅ Include name if your backend expects it
          price: Number(price),
          features: featuresArray,
          description,
          image: location.state.image, // keep existing URL
        };

        await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/category/${categorySlug}`,
          categoryInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        toast.success("Category updated successfully!");
        navigate("/admin/categories");
        return;
      }

      // 🔹 Case 2: New image uploaded → upload to Supabase first
      // Use unique filename to avoid cache issues
      const fileName = `categories/${Date.now()}_${image.name.replace(/\s+/g, "-")}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("Images")
        .upload(fileName, image, {
          upsert: false,
          contentType: image.type,
          cacheControl: "3600",
        });

      if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

      // Get public URL
      const {
        data: { publicUrl },
        error: urlError,
      } = supabase.storage.from("Images").getPublicUrl(uploadData.path);

      if (urlError || !publicUrl) {
        throw new Error(
          `Failed to get URL: ${urlError?.message || "Unknown error"}`,
        );
      }

      // Prepare & send updated category
      const categoryInfo = {
        name,
        price: Number(price),
        features: featuresArray,
        description,
        image: publicUrl, // ✅ new image URL
      };

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/${categorySlug}`,
        categoryInfo,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      toast.success("Category updated successfully!");
      navigate("/admin/categories");
    } catch (error) {
      console.error("❌ Update error:", error);
      toast.error("Failed to update: " + error.message);
    } finally {
      // ✅ ALWAYS stop loading, even on error
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold mb-4 text-center">Update Category</h2>

        <div>
          <label htmlFor="name" className="block font-medium mb-1">
            Category Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="w-full px-4 py-2 border rounded"
            required
            disabled
          />
        </div>

        <div>
          <label htmlFor="price" className="block font-medium mb-1">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-4 py-2 border rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="features" className="block font-medium mb-1">
            Features (comma-separated)
          </label>
          <input
            id="features"
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="Feature1, Feature2, Feature3"
            className="w-full px-4 py-2 border rounded"
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
            placeholder="Enter category description"
            className="w-full px-4 py-2 border rounded resize-none"
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
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 flex justify-center"
        >
          {isLoading ? (
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
          ) : (
            <span className="text-white ">Update Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
