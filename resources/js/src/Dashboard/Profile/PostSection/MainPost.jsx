import { Pencil } from 'lucide-react'
import React, { useState } from 'react'
import PostContainer from './PostContainer'
import AddPost from './AddPost';

const MainPost = ({profile}) => {


  const [openPost , setOpen] = useState(false);

  return (
     <div className='ml-50 mt-5 text-black'>
      <div className='relative h-auto w-220 border border-gray-300 rounded-md bg-white'>

        <div className='flex justify-between p-4 items-center border-b border-gray-200'>
          <h2 className='text-xl'>Activity</h2>
          <button className='border p-3 rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer'
          onClick={()=>{
            setOpen(!openPost)
          }}
>
            <Pencil size={18} />
          </button>
        </div>

        <div className=' p-3 mt-2 flex gap-2'>
            <button className='border rounded-md p-3 cursor-pointer '>Post</button>
                        <button className='border rounded-md p-3 cursor-pointer '>Comment</button>

            <button className='border rounded-md p-3  cursor-pointer'>Video</button>

        </div>

        <div className=' p-3 mt-2 flex gap-2 overflow-x-auto'>

            <PostContainer/>
             <PostContainer/>
              <PostContainer/>
               <PostContainer/>

        </div>


{openPost && <AddPost close={() => setOpen(false)}  profile={profile}/>}

     

        </div>
        </div>
  )
}

export default MainPost
