import { useState } from "react";
import uploadMedia, { uploadMediaToSupabase } from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const featuresArray = features.split(",");

    uploadMediaToSupabase(file).then((res) => {
      getDownloadURL(file.name).then((res) => {
        const url = supabase.storage
        const categoryInfo = {
          name: name,
          price: price,
          features: featuresArray,
          description: description,
          image: url.data.publicUrl,
        };
        console.log(snapshot.ref)
        console.log(url)
        axios
          .post(
            import.meta.env.VITE_BACKEND_URL + "/api/category",
            categoryInfo,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            toast.success("category added successfully!");
            navigate("/admin/categories/");
            setIsLoading(false);
          });
      });
    });
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-[400px] flex flex-col gap-4"
      >
        <button className="text-end">
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
            <span className="text-white ">Add Category</span>
          )}
        </button>
      </form>
    </div>
  );
}
