import axios from "axios";
import { useEffect, useState } from "react";

function UserTag(props) {
  const [name, setName] = useState("");
  const [userFound, setUserFound] = useState(false)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          console.log(res);
          setName(res.data.user.firstName + " " + res.data.user.lastName);
          setUserFound(true)
        });
    }else{
      setName("")
    }
  }, [userFound]);

  return (
    <div className="flex items-center cursor-pointer border-l-4 border-dotted border-c4">
      <img src={props.imageLink} className="w-[40px] rounded-[30%] ml-2 mr-2" />
      <span className="text-c4 text-lg">{name}</span>
      <button onClick={()=>{
        localStorage.removeItem("token")
        setUserFound(false)
      }}>Logout</button>
    </div>
  );
}

export default UserTag;