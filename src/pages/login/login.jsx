import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(){
    axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login",{
      email: email,
      password: password
    }).then((res)=>{
      localStorage.setItem("token", res.data.token)
      if(res.data.user.type == "Customer"){
        window.location.href = "/"
      }else if(res.data.user.type == "Admin"){
        window.location.href = "/admin/"
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  return (
    <div className="w-screen h-screen bg-[url('/public/Login_Wall.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="flex justify-center items-center w-screen h-screen bg-white bg-opacity-20">
        <div className="flex flex-col relative justify-center items-center w-[400px] h-[350px] backdrop-blur-md rounded-lg">
          <h1 className="absolute top-[30px] text-4xl text-center text-c5 font-bold">
            Login
          </h1>
          <input
            type="text"
            placeholder="Enter your email address"
            className="w-[85%] bg-[#00000000] border-c5 border-[3px] text-white placeholder:text-gray-800 h-[40px] px-[10px] mb-5"
            defaultValue={email}
            onChange={
                (e)=>{
                    setEmail(e.target.value)
                }
            }
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-[85%] bg-[#00000000] border-c5 border-[3px] text-white placeholder:text-gray-800 h-[40px] px-[10px] mb-5"
            defaultValue={password}
            onChange={
                (e)=>{
                    setPassword(e.target.value)
                }
            }
          />
          <button className="absolute bottom-[30px] w-[85%] bg-c3 text-white text-2xl h-[40px] rounded-full"
          onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
}