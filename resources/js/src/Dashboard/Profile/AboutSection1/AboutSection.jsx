import { Pencil } from "lucide-react";
import React, { useEffect, useState } from "react";
import EditAboutBox from "./EditAboutBox";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const AboutSection = () => {
  const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
  const token = localStorage.getItem("user_token");
  const user_id = user_info.id;

  const navigate = useNavigate();
  const location = useLocation();

  const [showMore, setShowMore] = useState(false);
  const [aboutText, setAboutText] = useState("");

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = () => {
    fetch(`http://127.0.0.1:8000/api/get/about/${user_id}` , {
      method : "GET" ,
      headers : {
        "Authorization": `Bearer ${token}`,
      }
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) setAboutText(data.about.aboutText);
      })
  };

  const limit = 420;

  const editBoxOpen = location.pathname.endsWith("/edit/about");

  return (
    <div className="ml-50 mt-5 text-black">
      <div className="relative h-auto w-220 border border-gray-300 rounded-md bg-white">
        <div className="flex justify-between p-4 items-center border-b border-gray-200">
          <h2 className="text-xl">About</h2>
          <button
            className="border p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
            onClick={() => navigate(`/profile/${user_id}/edit/about`, { state: { background: location } })}
          >
            <Pencil size={18} />
          </button>
        </div>

        <div className="p-4">
          <p className="text-sm whitespace-pre-line">
            {aboutText ? (showMore ? aboutText : aboutText.slice(0, limit)) : "Please add it"}
          </p>
          {aboutText.length > limit && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 font-medium mt-2 hover:underline"
            >
              {showMore ? "Show less" : "... Show more"}
            </button>
          )}
        </div>
      </div>

      {editBoxOpen && (
        <EditAboutBox
          close={() => navigate(`/profile/${user_id}`)}
          aboutText={aboutText}
          setAboutText={setAboutText}
        />
      )}
    </div>
  );
};

export default AboutSection;