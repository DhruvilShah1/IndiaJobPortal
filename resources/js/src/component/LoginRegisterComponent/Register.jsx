import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate();



  const [form, setForm] = useState({
    name: "",
    email: "", 
    password: ""
  });

  const handleChange = async (e) => {
    const updatedForm = {
      ...form,
      [e.target.name]: e.target.value,
    };

    setForm(updatedForm)
  };

const handleSubmit = async (e) => {
  e.preventDefault();
    await fetch("http://127.0.0.1:8000/sanctum/csrf-cookie", {
      credentials: "include",
    });

    const response = await fetch(
      "http://127.0.0.1:8000/api/register",
      {
        method: "POST", 
        credentials: "include",
     
              headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },

        body: JSON.stringify(form), 
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Success:", data);
      navigate('/login')
        toast.success(data.message)

    }
    else{

for (let i in data.errors){
  console.log(data.errors[i][0]);
  toast.error(data.errors[i][0])
}

    }
 
  }
    

  return (
    <div className="min-h-screen flex items-center justify-center bg-#ffff">

  <div className="bg-white rounded-lg shadow-md flex w-850px overflow-hidden">

    <div className="hidden md:flex flex-col justify-center items-center bg-[#0a66c2] text-white w-1/2 p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to</h1>
      <h2 className="text-4xl font-bold">IndiaIn</h2>
      <p className="mt-4 text-center text-sm opacity-90">
        Connect with professionals and grow your career.
      </p>
    </div>

    <div className="w-full md:w-1/2 p-8">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Register Here
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-black">

        <input
          type="text"
          placeholder="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
        />

        <input
          type="email"
          placeholder="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
        />

        <input
          type="password"
          placeholder="Password (6+ characters)"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="border border-gray-300 p-3 rounded text-black focus:outline-none focus:ring-2 focus:ring-[#0a66c2]"
        />

        <button
          type="submit"
          className="bg-[#0a66c2] text-white p-3 rounded-full font-semibold hover:bg-[#004182] transition"
        >
          Agree & Join
        </button>

      </form>

      <p className="text-sm text-gray-600 mt-6 text-center">
        Already on LinkedIn?
        <span className="text-[#0a66c2] font-semibold cursor-pointer ml-1">
          <Link to="/login">Go to Login</Link>

        </span>
      </p>
    </div>

  </div>


</div>

  );
};

export default Register;
