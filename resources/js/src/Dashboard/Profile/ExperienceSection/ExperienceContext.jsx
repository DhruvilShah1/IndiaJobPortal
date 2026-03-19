import React, { createContext, useState, useEffect } from "react";

export const ExperienceContext = createContext();

export function ExperienceProvider({ children }) {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
        const token = localStorage.getItem("user_token");
        const user_id = user_info.id;

        const res = await fetch(`http://127.0.0.1:8000/api/get/user/${user_id}`,{
          method : "GET" ,
          headers : {

            "Authorization": `Bearer ${token}`,
          }
        });
        const data = await res.json();

        setExperiences(data.data.experience || []);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      }
    };

    fetchExperiences();
  }, []);

  return (
    <ExperienceContext.Provider value={{ experiences, setExperiences }}>
      {children}
    </ExperienceContext.Provider>
  );
}