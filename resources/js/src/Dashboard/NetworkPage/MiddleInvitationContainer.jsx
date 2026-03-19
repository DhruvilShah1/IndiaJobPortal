import React, { use, useEffect, useState } from 'react'
import CompanyRequestBox from './CompanyRequestBox'
import UserRequest from './UserRequest'
import {db} from '../firestore'

const MiddleInvitationContainer = ({user ,  setPage}) => {
const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
console.log(user);


  const loggedInUserId = user_info.id;
  const [RequestUser , SetRequestUser] = useState([])

  const NextPage = () => {
      setPage(prev => prev + 1);
  }


    const request =  () => {
      
    db.collection("mutual_connection")
    .where("receiver_id", "==", loggedInUserId)
    .onSnapshot((snapshot) => {
      snapshot.docChanges().forEach(async (change) => {
          const data = change.doc.data();

      
          
          if(data.recevier_status === 'pending'){
            

            const res = await  fetch(`http://127.0.0.1:8000/api/get/user/${data.sender_id}`);
            const senderDetails = await  res.json();

            let newRequest = {
              id: change.doc.id,
              ...data,
              senderDetails
            };
          

          if (change.type === "added") {
  SetRequestUser(prev => [
    ...prev,
    newRequest    
  ]);
}
 if (change.type === "modified") {
          SetRequestUser(prev =>
            prev.filter(item => item.id !== change.doc.id)
          );
        }

        if (change.type === "removed") {
          SetRequestUser(prev =>
            prev.filter(item => item.id !== change.doc.id)
          );
        }

      }
      });
    });

    
    }
  
    useEffect(() => {
      request(); 
    }, []);
  
  return (
    <div className='ml-5 mt-5 w-210  text-black '>
      
      <div className='h-105 border bg-white overflow-hidden' >
        <div className='flex justify-between p-3 text-base border-b border-gray-300'>
        <h3>Invitation</h3>
        <button className='font-bold cursor-pointer text-gray-400'>Show aLL</button>
      </div>
<div>

  
{RequestUser.map(element => (
  <CompanyRequestBox
   key={element.id}            // React internal
    requestKey={element.id}     // pass inside component
    user={element}
    requestId={element.id}
  />
))}
</div>
 {/* {RequestUser ? (
  <CompanyRequestBox key={RequestUser.id} user={RequestUser} requestId={RequestUser.id} />
) : (
  <p className="p-3 text-center text-gray-500">No user found</p>
)} */}

      </div>


<div className='mt-2 p-3 border text-black  bg-white '>

    <p>Suggestion for you</p>
     
<div className="flex gap-5 flex-wrap">
  {user? (
    user.map((u) => (
      <UserRequest key={`user-${u.id}`}  user={u} />
    ))
  ) : (
    <p>No users found</p>
  )}
</div>


<button  onClick={NextPage}>Next</button>

</div>


    </div>
  )
}

export default MiddleInvitationContainer
