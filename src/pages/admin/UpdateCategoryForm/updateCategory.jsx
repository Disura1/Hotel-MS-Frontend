import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const featuresArray = features.split(",");
    if (image == null) {
      const categoryInfo = {
        price: price,
        features: featuresArray,
        description: description,
        image: location.state.image,
      };
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
          categoryInfo,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res);
          setIsLoading(false);
          toast.success("Category updated successfuly");
          navigate("/admin/categories");
        });
    } else {
      uploadMedia(image).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          const categoryInfo = {
            price: price,
            features: featuresArray,
            description: description,
            image: url,
          };
          axios
            .put(
              import.meta.env.VITE_BACKEND_URL + "/api/category/" + name,
              categoryInfo,
              {
                headers: {
                  Authorization: "Bearer " + token,
                },
              }
            )
            .then((res) => {
              console.log(res);
              setIsLoading(false);
              toast.success("Category updated successfully");
              navigate("/admin/categories");
            });
        });
      });
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
