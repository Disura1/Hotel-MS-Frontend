import { useState } from "react";
import { supabase } from "../../../utils/mediaUpload.js"; // Ensure supabase is correctly imported
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";

export default function AddCategoryForm() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "/login";
  }

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const featuresArray = features.split(",");

    try {
      // Step 1: Upload the image to Supabase
      if (image) {
        const { data, error } = await supabase.storage
          .from("images") // Replace with your actual bucket name
          .upload(`categories/${image.name}`, image);

        if (error) throw new Error(error.message);

        // Step 2: Get the public URL of the uploaded image
        const { publicURL, error: urlError } = supabase.storage
          .from("images")
          .getPublicUrl(data.path);

        if (error) {
          console.log("Error fetching image: ", error);
        } else {
          console.log("Image URL: ", publicURL);
        }

        // Step 3: Prepare the category data
        const categoryInfo = {
          name: name,
          price: price,
          features: featuresArray,
          description: description,
          image: publicURL, // The public URL of the uploaded image
        };

        // Step 4: Send the category data to the backend API
        const response = await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/category",
          categoryInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Success handling
        toast.success("Category added successfully!");
        navigate("/admin/categories/");
      } else {
        toast.error("Please upload an image.");
      }
    } catch (error) {
      // Error handling
      toast.error("An error occurred: " + error.message);
    } finally {
      setIsLoading(false); // Stop the loading state
    }
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-4"
      >
        <button className="text-end" onClick={() => navigate("/admin/categories/")}>
          <IoClose />
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Add New Category</h2>

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
            <span className="text-white">Add Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
