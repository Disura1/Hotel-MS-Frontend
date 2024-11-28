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

export default function AdminPage() {
  return (
    <div className="flex w-full h-screen max-h-screen">
      <div className="w-[20%] h-screen bg-c2 flex flex-col text-c4 text-[30px]">
        <div className="hover:font-bold flex items-center">
          <MdBookmarkBorder />
          <Link to="/admin/bookings">Bookings</Link>
        </div>
        <div className="hover:font-bold flex items-center">
          <MdOutlineCategory />
          <Link to="/admin/categories">Categories</Link>
        </div>
        <div className="hover:font-bold flex items-center">
          <MdOutlineBedroomParent />
          <Link to="/admin/rooms">Rooms</Link>
        </div>
        <div className="hover:font-bold flex items-center">
          <FaRegUser />
          <Link to="/admin/users">Users</Link>
        </div>
        <div className="hover:font-bold flex items-center">
          <MdOutlineFeedback />
          <Link to="/admin/feedbacks">Feedbacks</Link>
        </div>
        <div className="hover:font-bold flex items-center">
          <GrGallery />
          <Link to="/admin/galleryItems">Gallery Items</Link>
        </div>
      </div>
      <div className="overflow-y-scroll w-[80%] bg-c1">
        <Routes path="/*">
          <Route path="/bookings" element={<AdminBookings />} />
          <Route path="/categories" element={<AdminCategories/>} />
          <Route path="/add-category" element={<AddCategoryForm/>} />
          <Route path="/update-category" element={<UpdateCategoryForm/>} />
          <Route path="/rooms" element={<AdminRooms/>} />
          <Route path="/users" element={<AdminUsers/>} />
          <Route path="/feedbacks" element={<AdminFeedbacks/>} />
          <Route path="/galleryItems" element={<AdminGalleryItems/>} />
          <Route path="/add-gallery-item" element={<AddGalleryItem/>} />
          <Route path="/update-gallery-item" element={<UpdateGalleryItemForm/>} />
        </Routes>
      </div>
    </div>
  );
}
