import { Link, Route, Routes } from "react-router-dom";
import {
  MdOutlineCategory,
  MdBookmarkBorder,
  MdOutlineBedroomParent,
  MdOutlineFeedback,
} from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import AdminBookings from "../admin/bookings/adminBookings.jsx";
import AdminCategories from "../admin/categories/adminCategories.jsx";
import AdminRooms from "../admin/rooms/adminRooms.jsx";
import AdminUsers from "../admin/users/adminUsers.jsx";
import AdminFeedbacks from "../admin/feedbacks/adminFeedbacks.jsx";
import AdminGalleryItems from "../admin/galleryItems/adminGalleryItems.jsx";
import AddCategoryForm from "../admin/AddCategoryForm/addCategoryForm.jsx";
import UpdateCategoryForm from "../admin/UpdateCategoryForm/updateCategory.jsx";
import AddGalleryItem from "../admin/AddGalleyForm/addGalleryForm.jsx";
import UpdateGalleryItemForm from "../admin/UpdateGalleryItem/updateGallery.jsx";
import AddRoomForm from "../admin/AddRoomForm/addRoomForm.jsx";
import UpdateRoomForm from "../admin/UpdateRoomForm/updateRoomForm.jsx";

export default function AdminPage() {
  return (
    <div className="flex w-full h-screen max-h-screen">
      <div className="w-[20%] min-w-[20%] h-screen bg-c1 flex flex-col items-center text-[30px]">
        <h1 className="font-bold text-4xl bg-gradient-to-r from-c2 to-c4 bg-clip-text text-transparent my-5 cursor-pointer"
        onClick={() => {
          window.location.href = "http://localhost:5173/admin/";
        }}>
          Admin Dashboard
        </h1>
        <div className="my-5 border-[3px] w-[80%] pl-6 rounded-full hover:font-bold hover:bg-c2 hover:text-white focus-within:bg-c2 flex items-center">
          <MdBookmarkBorder />
          <Link className="pl-4" to="/admin/bookings">
            Bookings
          </Link>
        </div>
        <div className="my-5 border-[3px] w-[80%] pl-6 rounded-full hover:font-bold hover:bg-c2 hover:text-white focus-within:bg-c2 flex items-center">
          <MdOutlineCategory />
          <Link className="pl-4" to="/admin/categories">
            Categories
          </Link>
        </div>
        <div className="my-5 border-[3px] w-[80%] pl-6 rounded-full hover:font-bold hover:bg-c2 hover:text-white focus-within:bg-c2 flex items-center">
          <MdOutlineBedroomParent />
          <Link className="pl-4" to="/admin/rooms">
            Rooms
          </Link>
        </div>
        <div className="my-5 border-[3px] w-[80%] pl-6 rounded-full hover:font-bold hover:bg-c2 hover:text-white focus-within:bg-c2 flex items-center">
          <FaRegUser />
          <Link className="pl-4" to="/admin/users">
            Users
          </Link>
        </div>
        <div className="my-5 border-[3px] w-[80%] pl-6 rounded-full hover:font-bold hover:bg-c2 hover:text-white focus-within:bg-c2 flex items-center">
          <MdOutlineFeedback />
          <Link className="pl-4" to="/admin/feedbacks">
            Feedbacks
          </Link>
        </div>
        <div className="my-5 border-[3px] w-[80%] pl-6 rounded-full hover:font-bold hover:bg-c2 hover:text-white focus-within:bg-c2 flex items-center">
          <GrGallery />
          <Link className="pl-4" to="/admin/galleryItems">
            Gallery Items
          </Link>
        </div>
      </div>
      <div className="h-screen w-full">
        <div className="h-[10%] bg-gradient-to-r from-c1 to-c2 w-full flex items-center justify-end pr-5">
          <button
            className="bg-red-500 font-bold text-2xl px-4 py-1 rounded-full hover:bg-transparent hover:text-red-500 hover:bg-c1 hover:border-4 hover:px-3 hover:py-0 hover:border-red-500"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
        <div className="overflow-y-scroll w-full h-[90%] bg-gray-500">
          <Routes path="/*">
            <Route path="/bookings" element={<AdminBookings />} />
            <Route path="/categories" element={<AdminCategories />} />
            <Route path="/add-category" element={<AddCategoryForm />} />
            <Route path="/update-category" element={<UpdateCategoryForm />} />
            <Route path="/rooms" element={<AdminRooms />} />
            <Route path="/add-room" element={<AddRoomForm />} />
            <Route path="/update-room" element={<UpdateRoomForm />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/feedbacks" element={<AdminFeedbacks />} />
            <Route path="/galleryItems" element={<AdminGalleryItems />} />
            <Route path="/add-gallery-item" element={<AddGalleryItem />} />
            <Route
              path="/update-gallery-item"
              element={<UpdateGalleryItemForm />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
