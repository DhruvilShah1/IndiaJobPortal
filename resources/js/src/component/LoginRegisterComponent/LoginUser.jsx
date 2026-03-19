import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
const { setUser } = useContext(AuthContext);
const navigate = useNavigate();

    const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
    credentials: "include",
  });

  const response = await fetch(
    "http://127.0.0.1:8000/api/user/login",
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }
  );

  const data = await response.json();

  if (response.ok) {
  localStorage.setItem("user_token", data.token);
  localStorage.setItem("user_data", JSON.stringify(data.user)); 
  setUser(data.user);
  toast.success("Login Succesfully ")
  navigate("/dashboard");
    
  } else {
  console.log(data.errors);
      toast.error(data.message || "Login failed");

  toast.error(data.errors )
}  

};


  return (
    <div className="min-h-screen flex items-center justify-center bg-white text-black">
      <form
        onSubmit={handleSubmit}
        className= "p-8 rounded-xl shadow-md w-80"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );

}

export default LoginUser
