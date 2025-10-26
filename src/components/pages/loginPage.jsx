import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function loginPage() {

  const [email, setEmail] = useState("Your email");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();


  /*
function handleEmailChange(e){
  setEmail(e.target.value)
  console.log(email)
}
*/


  function handleLogin() {
    console.log("Login button clicked");


    axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/login", {
      email: email,
      password: password
    }).then((res) => {
      console.log(res.data);

      if (res.data.user == null) {

        toast.error("Invalid Credentials");


        return;
      }



      // Save user data to local storage

      localStorage.setItem("token", res.data.token);


      if (res.data.user.type == "admin") {
        window.location.href = "/admin";
      }
      else {
        window.location.href = "/";
      }







    })



  }






































  return (
    <div className="main flex justify-center items-center w-full h-screen bg-red-900">
      <div className="w-[400px] h-[450px] bg-blue-600 flex flex-col justify-center items-center">
        <img className="rounded-full w-[100px] " src="/logo.png" alt="" />
        <span>Email</span>
        <input
          type="text"
          defaultValue={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // console.log(email);
          }}
        />

        <span>Password</span>
        <input type="password" name="" id="" defaultValue={password} onChange={
          (e) => {
            setPassword(e.target.value);
            // console.log(password);
          }
        }
        />

        <button className="bg-white" onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

