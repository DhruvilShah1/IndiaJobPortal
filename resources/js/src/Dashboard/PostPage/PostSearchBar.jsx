import { Camera, Newspaper, Video } from 'lucide-react'
import React, { useState } from 'react'
import OpenPostBox from './OpenPostBox';
import AddPost from '../Profile/PostSection/AddPost';

const PostSearchBar = ({profile}) => {
    const [postBox , OpenBox]= useState(false);
    window.addEventListener('keydown',(e)=>{
        if(e.key === 'Escape'){
  OpenBox(false)
        }
      
    })

    const toggleBox = () =>{
        OpenBox(!postBox)
    }

  return (
    <div className='border border-gray-300 rounded-lg p-3 bg-white'>
        <div className='flex items-center gap-2'>
        <div>
  <img
                  src={profile ? `http://127.0.0.1:8000/storage/${profile.avatar}`  :"https://img.freepik.com/premium-vector/avatar-profile-icon-flat-style-female-user-profile-vector-illustration-isolated-background-women-profile-sign-business-concept_157943-38866.jpg"}
          className='rounded-full h-16 object-cover'
          alt=""
        />
        </div>
        <div>
  <input
    type="search"
    placeholder="Start a Post"
    className="border w-120 p-3 rounded-full cursor-pointer"
    disabled
  />
</div>
      
    </div>

    <div className='flex justify-between p-2 bg-white text-sm'>
        <div className=' p-3'>
            <div className='flex items-center gap-2 cursor-pointer'onClick={toggleBox} ><Video />Video</div>
        </div>

         <div className=' p-3'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={toggleBox}><Camera/>Photo</div>
        </div>
         <div className=' p-3'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={toggleBox}><Newspaper />Write a article</div>
        </div>

    </div>

    
          {
            postBox && (

              <AddPost close={()=> OpenBox(false) } profile={profile}/>
    
            )
          }

    </div>
  )
}

export default PostSearchBar
