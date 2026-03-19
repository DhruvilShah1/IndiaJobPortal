import { Plus } from "lucide-react";
import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AddExperienceBox from "../Profile/ExperienceSection/AddExperienceBox";
import { ExperienceContext } from "../Profile/ExperienceSection/ExperienceContext";
import AddPost from "../Profile/PostSection/AddPost";

const Right_side_dashboard = ({ profile }) => {
  const { setExperiences } = useContext(ExperienceContext);

  const navigate = useNavigate();
  const location = useLocation();

  const [editBoxOpen, setEditBoxOpen] = useState(false);
  const [postBox, setPostBox] = useState(false);

  const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
  const user_id = user_info?.id;

  const handleAddExperience = (newExp) => {
    setExperiences((prev) => [...prev, newExp]);
    setEditBoxOpen(false);
  };

  if (!user_id) return <div>Loading user data...</div>;

  return (
    <div className="ml-40 mt-10 sticky top-4 h-[22rem] w-70 bg-white text-black border border-gray-300 shadow-sm rounded-md">

      <div className="relative border-b border-gray-300 h-32 w-full overflow-hidden rounded-t-md">
        <img
          src={
            profile
              ? `http://127.0.0.1:8000/storage/${profile.cover_image}`
              : "https://t4.ftcdn.net/jpg/04/28/76/95/360_F_428769564_NB2T4JM9E2xsxFdXXwqW717HwgaZdpAq.jpg"
          }
          className="w-full h-full object-cover"
          alt="Banner"
        />
      </div>

      <div className="absolute top-24 left-4">
        <img
          src={
            profile
              ? `http://127.0.0.1:8000/storage/${profile.avatar}`
              : "https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"
          }
          className="rounded-full h-16 w-16 object-cover border-2 border-white shadow"
          alt="Profile"
        />
      </div>

      <div className="flex flex-col mt-10 text-lg p-3 gap-1">
        <h3 className="font-semibold">{user_info.name}</h3>

        <p className="text-sm line-clamp-2">
          {profile ? profile.Headline : "Please Complete the Profile"}
        </p>

        <span className="text-sm text-gray-500">
          {profile ? profile.location : "Please Complete the location"}
        </span>

        <button
          className="bg-blue-500 hover:bg-blue-600 transition text-white px-3 py-1.5 rounded text-sm mt-2"
          onClick={() => setEditBoxOpen(true)}
        >
          Add Experience
        </button>
      </div>

      <div className="mt-3 h-20 border-t bg-white rounded-b-md p-3 cursor-pointer">
        <div className="flex flex-col gap-2 text-sm text-gray-500">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold hover:text-blue-500 hover:underline">
              Profile Views
            </h2>
            <span>120</span>
          </div>

          <div className="flex justify-between items-center">
            <h2 className="font-semibold hover:text-blue-500 hover:underline">
              Post Impressions
            </h2>
            <span>120</span>
          </div>
        </div>
      </div>

      {editBoxOpen && (
        <AddExperienceBox
          close={() => setEditBoxOpen(false)}
          setExperiences={handleAddExperience}
        />
      )}
    </div>
  );
};

export default Right_side_dashboard;