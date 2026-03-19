import { Pencil, Plus } from 'lucide-react';
import React, { useState, useEffect, useContext } from 'react';
import AddExperienceBox from './AddExperienceBox';
import { useNavigate } from 'react-router-dom';
import { ExperienceContext } from './ExperienceContext';

const MainExperience = () => {
  const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
  const user_id = user_info.id;


  const { experiences, setExperiences } = useContext(ExperienceContext); 

  const navigate = useNavigate()
  

  const [experienceBoxOpen, setExperienceBoxOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  const fetchExperiences = async () => {
    try {
      setLoading(true);
      const res = await fetch(`http://127.0.0.1:8000/api/get/experience/${user_id}`);
      const data = await res.json();

      if (data.success) {
        setExperiences(data.experiences || []);
      }
    } catch (err) {
      console.error('Error fetching experiences:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  const handleAddExperience = (newExp) => {
    setExperiences([...experiences, newExp]);
  };

  return (
    <div className='ml-50 mt-5 text-black'>
      <div className='relative h-auto w-220 border border-gray-300 rounded-md bg-white'>

        <div className='flex justify-between p-4 items-center border-b border-gray-200'>
          <h2 className='text-xl'>Experience</h2>
          <div className='flex gap-5'>
            <button
              className='border p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer'
              onClick={() => setExperienceBoxOpen(true)}
            >
              <Plus size={18} />
            </button>
            <button className='border p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer'
              onClick={() =>         navigate(`/detail/experience/${user_id}`)
}
            >
              <Pencil size={18} />
            </button>
          </div>
        </div>

      <div className='p-4 space-y-4'>
  {loading ? (
    <p className='text-gray-500'>Loading experiences...</p>
  ) : experiences.length === 0 ? (
    <p className='text-gray-500'>Please add experience.</p>
  ) : (
    experiences.map((exp) => (
      <div key={exp.id} className='flex gap-5 border-b pb-4'>
        <div className='flex-shrink-0'>
          <img
            src={exp.company_logo || 'https://img.freepik.com/free-vector/abstract-company-logo_53876-120501.jpg?semt=ais_hybrid&w=740&q=80'}
            alt={exp.company}
            className='h-14 w-14 rounded-full object-cover'
          />
        </div>

        <div className='flex-1'>
          <h3 className='font-semibold text-lg'>{exp.title}</h3>
          <p className='text-sm text-gray-600'>
            {exp.company} | {exp.employment_type}
          </p>
          <p className='text-sm text-gray-500'>
            {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
          </p>
          {exp.description && (
            <p className='text-sm mt-1 whitespace-pre-line text-gray-700'>
              {exp.description}
            </p>
          )}
          {exp.skills && exp.skills.length > 0 && (
            <div className='flex flex-wrap gap-2 mt-2'>
              {exp.skills.map((skill, index) => (
                <span
                  key={index}
                  className='px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs'
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    ))
  )}
</div>
      </div>

      {experienceBoxOpen && (
        <AddExperienceBox
          close={() => setExperienceBoxOpen(false)}
          AddExperience={handleAddExperience}
        />
      )}
    </div>
  );
};

export default MainExperience;