import axios from "axios";
import { useEffect, useState } from "react";
import { RiLoginCircleFill } from "react-icons/ri";
import toast from "react-hot-toast";

function UserTag(props) {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          setName(res.data.user.firstName + " " + res.data.user.lastName);
          setUserFound(true);
        })
        .catch((err) => {
          console.log(err);
          setName("");
          setUserFound(false);
        });
    } else {
      setName("");
      setUserFound(false);
    }
  }, []);

  return (
    <div className="right-4 flex items-center space-x-4">
      {userFound ? (
        <div className="flex items-center space-x-3">
          <img
            className="rounded-full w-12 h-12 border-2 border-white shadow-md"
            src={props.imageLink}
            alt="User"
          />
          <span className="text-c3 font-medium text-lg">{name}</span>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              setUserFound(false);
              toast.success("Successfully Logout")
            }}
            className="bg-red-500 font-bold text-white px-4 py-1 rounded-md hover:bg-transparent hover:text-red-500 hover:border-4 hover:px-3 hover:py-0 hover:border-red-500 transition"
          >
            Logout
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            window.location.href = "/login";
          }}
          className="flex items-center bg-blue-500 text-white font-bold px-4 py-1 rounded-md hover:bg-transparent hover:border-4 hover:border-blue-500 hover:px-3 hover:py-1 transition"
        >
          <RiLoginCircleFill className="mr-2"/>
          Login / Sign Up
        </button>
        
      )}
    </div>
  );
}

export default UserTag;