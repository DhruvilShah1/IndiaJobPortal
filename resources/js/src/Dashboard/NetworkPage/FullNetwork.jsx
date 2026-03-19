import React, { use } from 'react'
import RightSideContiner from './RightSideContiner'
import MiddleInvitationContainer from './MiddleInvitationContainer'

const FullNetwork = ({user ,  setPage}) => {

  
  return (
       <div className='text-black'>



      <div className='flex gap-5 bg-[#ffeeee] '>

<RightSideContiner/>
<MiddleInvitationContainer  user={user} setPage={setPage}/>
      </div>
    </div>
  )
}

export default FullNetwork
