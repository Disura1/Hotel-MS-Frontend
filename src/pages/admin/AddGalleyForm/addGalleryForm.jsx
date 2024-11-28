import { useState } from "react";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !description || !image) {
      toast.error("All fields are required!");
      return;
    }
    setIsLoading(true);

    uploadMedia(image)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((url) => {
        const galleryItem = {
          name,
          description,
          image: url,
        };

        axios
          .post(
            import.meta.env.VITE_BACKEND_URL + "/api/gallery",
            galleryItem,
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            toast.success("Gallery item added successfully!");
            navigate("/admin/galleryItems/");
            setIsLoading(false);
          })
          .catch((err) => {
            console.error(err);
            toast.error("Failed to add gallery item.");
            setIsLoading(false);
          });
      })
      .catch((err) => {
        console.error(err);
        toast.error("Image upload failed.");
        setIsLoading(false);
      });
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
