import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import uploadMedia from "../../../utils/mediaUpload.js";
import { getDownloadURL } from "firebase/storage";
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

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!image) {
      const galleryItemInfo = {
        name,
        description,
        image: location.state.image,
      };

      axios
        .put(
          `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${
            location.state._id
          }`,
          galleryItemInfo,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((res) => {
          setIsLoading(false);
          toast.success("Gallery item updated successfully");
          navigate("/admin/galleryItems");
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Error updating gallery item");
          console.error(err);
        });
    } else {
      uploadMedia(image)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .then((url) => {
          const galleryItemInfo = {
            name,
            description,
            image: url,
          };

          axios
            .put(
              `${import.meta.env.VITE_BACKEND_URL}/api/gallery/${
                location.state._id
              }`,
              galleryItemInfo,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            )
            .then((res) => {
              setIsLoading(false);
              toast.success("Gallery item updated successfully");
              navigate("/admin/galleryItems");
            });
        })
        .catch((err) => {
          setIsLoading(false);
          toast.error("Error updating gallery item");
          console.error(err);
        });
    }
  }

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
            Image (optional)
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
            <span className="text-white">Update Item</span>
          )}
        </button>
      </form>
    </div>
  );
}
