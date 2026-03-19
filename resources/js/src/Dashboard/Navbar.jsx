import { Bell, BriefcaseBusiness, ChevronDown, House, MessageCircle, Users } from 'lucide-react'
import React, { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'

const Navbar = () => {

  const navigate = useNavigate()

      const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
    const user_id = user_info.id


    const [isOpen, setIsOpen] = useState(false);

    const toggleProfile = () => {
        setIsOpen(!isOpen);
    };

    return (
<div className="w-full bg-white text-black flex justify-between md:justify-evenly items-center shadow-xl sticky top-0 z-50 px-2">

  {/* Logo */}
  <div>
    <img
      src="https://logos.textgiraffe.com/logos/logo-name/Shah-designstyle-friday-m.png"
      className="h-8 md:h-10 object-cover"
    />
  </div>

  <div className="flex items-center">

    {/* Navigation */}
    <div className="flex">

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `flex flex-col items-center w-14 md:w-20 text-[10px] md:text-xs p-2 md:p-3 ${
            isActive ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`
        }
      >
        <House size={20}/> Home
      </NavLink>

      <NavLink
        to="/network"
        className={({ isActive }) =>
          `flex flex-col items-center w-14 md:w-20 text-[10px] md:text-xs p-2 md:p-3 ${
            isActive ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`
        }
      >
        <Users size={20}/> Network
      </NavLink>

      <NavLink
        to="/jobs"
        className={({ isActive }) =>
          `flex flex-col items-center w-14 md:w-20 text-[10px] md:text-xs p-2 md:p-3 ${
            isActive ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`
        }
      >
        <BriefcaseBusiness size={20}/> Jobs
      </NavLink>

      <NavLink
        to="/messages"
        className={({ isActive }) =>
          `flex flex-col items-center w-14 md:w-20 text-[10px] md:text-xs p-2 md:p-3 ${
            isActive ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`
        }
      >
        <MessageCircle size={20}/> Message
      </NavLink>

      <NavLink
        to="/notifications"
        className={({ isActive }) =>
          `flex flex-col items-center w-14 md:w-20 text-[10px] md:text-xs p-2 md:p-3 ${
            isActive ? "border-b-2 border-blue-500 text-blue-500" : ""
          }`
        }
      >
        <Bell size={20}/> Notification
      </NavLink>

    </div>

    {/* Profile */}
    <div
      className="text-[10px] md:text-xs flex flex-col gap-1 items-center p-2 md:p-3 cursor-pointer relative"
      onClick={toggleProfile}
    >
      <img
        src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
        className="rounded-full h-5 md:h-6 object-cover"
        alt=""
      />

      <span className="flex items-center">
        Profile <ChevronDown size={14}/>
      </span>

      {isOpen && (
        <div className="absolute top-14 md:top-20 right-0 md:right-10 border h-auto w-60 md:w-65 bg-white p-3 shadow-lg">

          <div className="flex gap-3 pb-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              className="w-12"
            />

            <div>
              <h3 className="text-sm md:text-base">Dhruvil Shah</h3>

              <p className="text-xs mt-1">
                IT Graduate | Full Stack Developer | Learning ML & AI
              </p>
            </div>
          </div>

          <div className="mt-3 border w-full p-2 rounded-full text-sm border-t-2">
            <button
              className="text-blue-600 w-full"
              onClick={() => {
                navigate(`/profile/${user_id}`)
              }}
            >
              View Profile
            </button>


           
          </div>

           <div className='mt-2 border-t-2'>
              <div className='mt-2'>
                <h3 className='text-base font-bold mb-2'>Manage Profile</h3>
                <button className='border-none text-sm text-gray-400 cursor-pointer hover:underline' 
                onClick={()=>{
                  navigate('/user/activity')
                }}
                
                > Post & Activity </button>
              </div>
            </div>

        </div>
      )}
    </div>

  </div>

</div>
    )
}

export default Navbar
