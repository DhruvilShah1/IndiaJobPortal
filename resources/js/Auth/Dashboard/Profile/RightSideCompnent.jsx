import { Pencil } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import EditBox from './EditBox'
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const RightSideCompnent = ({profile , education , setProfile}) => {
      const {id} = useParams();

      console.log(id);
      
      console.log(profile?.user_id);
            
      


    const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
    const user_id = user_info.id
      const navigate = useNavigate();
  const location = useLocation();


    const [EditBoxOpen, setEditBoxOpen] = useState(false);

      const editBoxOpen = location.pathname.endsWith("/edit/profile");


    const toggle = () => {
        setEditBoxOpen(prev => !prev);
    };

    return (
        <div className='ml-50 mt-5 text-black'>

            <div className='relative h-123 w-220 border border-gray-300 rounded-md bg-white'>

                <div>
                    <img
                        src={
                            profile
                                ? `http://127.0.0.1:8000/storage/${profile.cover_image}`
                                : "https://placehold.co/600x400"
                        }
                        className='h-56 w-full object-cover'
                        alt="cover"
                    />
                </div>

     
    <button
      onClick={() => navigate(`/profile/${user_id}/edit/profile`, { state: { background: location } })}
      className="absolute right-5 top-5 border p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
    >
      <Pencil size={18} />
    </button>
 

                <div className='h-20 relative'>
                    <img
                        src={
                            profile
                                ? `http://127.0.0.1:8000/storage/${profile.avatar}`
                                : "https://placehold.co/150"
                        }
                        className='absolute h-40 w-40 -top-16 left-10 rounded-full border-4 border-white object-cover'
                        alt="avatar"
                    />
                </div>

                <div className='flex justify-between p-7'>

                    <div className='flex flex-col gap-2 w-145'>
                        <div className='flex gap-2 items-center'>
                            <h2 className='text-2xl font-bold'>
                                {user_info?.name || "User Name"}
                            </h2>
                            <p>{ profile? profile.pronouns : ""}</p>
                        </div>

                        <p className='text-base'>
                            {profile? profile.Headline : "Add your headline"}
                        </p>

                        <p className='text-sm text-gray-500'>
                            {profile ? profile.location : "Add your location"}
                        </p>

                        <p className='text-sm text-blue-800'>
                            130 Connections
                        </p>
                    </div>

                    <div className='flex flex-col gap-3 h-30 overflow-hidden'>

         {profile?.show_experience && (
  <div className="flex flex-col items-center gap-4">
  {education.slice(0, 2).map((data, index) => (
    <div key={index} className="flex items-center gap-2">
      <img
        src={data.companyLogo || "https://png.pngtree.com/element_pic/00/16/09/2057e0eecf792fb.jpg"} 
        className="rounded-full h-10 w-10 object-cover"
        alt={data.company || "company"}
      />
      <p>{data.company || "Unknown Company"}</p>
    </div>
  ))}
</div>



)}

 
    
                    </div>

                </div>

            </div>

            {editBoxOpen && (
                <EditBox
          close={() => navigate(`/profile/${user_id}`)}
                    setProfile={setProfile}
                />
            )}

        </div>
    );
};

export default RightSideCompnent;