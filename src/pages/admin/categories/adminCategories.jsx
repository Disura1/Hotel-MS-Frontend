import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

export default function AdminCategories() {

    const token = localStorage.getItem("token");
    if(!token){
        window.location.href = "/login"
    }

  const [categories, setCategories] = useState([]);
  const [categoriesAreLoaded, setCategoriesAreLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!categoriesAreLoaded) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/category")
        .then((res) => {
          console.log(res.data.categories);
          setCategories(res.data.categories);
          setCategoriesAreLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [categoriesAreLoaded]);

    function handleDelete(name){
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/category/"+name,{
            headers: {
                Authorization: "Bearer "+token
            }
        }).then(()=>{
            toast.success("Category deleted successfully")
            setCategoriesAreLoaded(false)
        }).catch((err)=>{
            toast.error("Error deleting category")
        })
    }

  function handlePlusClick(){
    navigate("/admin/add-category")
  }

  return (
    <div className="w-full">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Name</th>
            <th className="border border-gray-300 px-4 py-2">Price</th>
            <th className="border border-gray-300 px-4 py-2">Features</th>
            <th className="border border-gray-300 px-4 py-2">Description</th>
            <th className="border border-gray-300 px-4 py-2">Image</th>
            <th className="border border-gray-300 px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category, index) => (
              <tr key={index} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {category.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${category.price}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <ul>
                    {category.features.map((feature, i) => {
                      return <li key={i}>{feature}</li>; 
                    })}
                  </ul>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {category.image ? (
                    <img
                      src={category.image}
                      alt={category.name}
                      className="h-16 w-16 object-cover"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                    <Link className="text-blue-500 mr-2" 
                          to={"/admin/update-category"}
                          state={category}>
                        <FaEdit />
                    </Link>
                    <button onClick={()=>{handleDelete(category.name)}} className="text-red-500">
                        <FaTrash />
                    </button>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
      <button onClick={()=>{handlePlusClick()}} className="bg-green-500 w-[60px] h-[60px] rounded-full text-4xl flex justify-center items-center fixed bottom-5 right-10">
        <FaPlus color="white"/>
      </button>
    </div>
  );
}
