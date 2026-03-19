import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import {db} from '../firestore'
import { toast } from 'react-toastify';
import { doc } from 'firebase/firestore';

const UserRequest = ({ user }) => {

    const [loading, setLoading] = useState(false);
  
  const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
  const loggedInUserId = user_info.id;
  if (!user) return null; 



const ConnectIt = () => {
  if (user.id === loggedInUserId) {
    toast.error("You cannot send a request to yourself");
    return;
  }

  setLoading(true)

  db.collection('mutual_connection')
    .where('sender_id', 'in', [loggedInUserId, user.id])
    .where('receiver_id', 'in', [loggedInUserId, user.id])
    .get()
    .then((snapshot) => {
      let existingRequest = null;

      snapshot.forEach(doc => {
        const data = doc.data();

        const ids = [data.sender_id, data.receiver_id];
        if (ids.includes(loggedInUserId) && ids.includes(user.id)) {
          existingRequest = { id: doc.id, ...data };
        }
      });

      if (existingRequest) {
        if (existingRequest.recevier_status === 'accepted') {
          toast.info("Request is already accepted");
        } else if (existingRequest.recevier_status === 'pending') {
          toast.info("Request is already sent");
        }
      } else {
        db.collection('mutual_connection')
          .add({
            sender_id: loggedInUserId,
            receiver_id: user.id,
            recevier_status: 'pending',
            send_request_time: new Date(),
            receiver_status_time: null
          })
          .then(() => {
            toast.success(`Request Sent to ${user.name}`);
          });
      }
            setLoading(false)

    }

  )
    .catch((err) => console.error("Error checking request:", err));
};
  return (
    <div className='flex flex-col h-75 w-60 border border-gray-200 rounded-3xl overflow-hidden bg-white'>

      <div className='relative'>
        <img
          src={user.profile?.cover_image 
            ? `http://127.0.0.1:8000/storage/${user.profile.cover_image}`
            : "https://img.freepik.com/premium-photo/free-seamless-pattern-abstract-texture-geometric-vector-illustration-design-wallpaper-background_1226483-21619.jpg?semt=ais_hybrid&w=740&q=80"
          }
          className='h-25 w-full object-cover'
          alt="cover"
        />

        <img
          src={user.profile?.avatar
            ? `http://127.0.0.1:8000/storage/${user.profile.avatar}`
            : "https://static.vecteezy.com/system/resources/previews/005/005/788/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg"
          }
          className="absolute left-1/2 -bottom-12 -translate-x-1/2 rounded-full object-cover h-24 w-24 border-4 border-white"
          alt="avatar"
        />
      </div>

      <div className='flex flex-col justify-center items-center mt-14'>
        <h2 className='text-lg font-bold'>{user.name}</h2>
        <p className='text-gray-400 h-13 p-2 text-sm text-center overflow-hidden'>
{user.profile?.Headline
  ? user.profile.Headline
    : "Headline not added"
}        </p>
      </div>

      {/* <div className='p-2 flex items-center gap-2'>
        <img
          src="https://media.licdn.com/dms/image/v2/D4D03AQG3rv_tsk8KEA/profile-displayphoto-scale_100_100/B4DZlgfNxrH4Ac-/0/1758260421658?e=1772668800&v=beta&t=6BnLaafcSpi2BYsBGohNTxZI0OZFaE1ZKcqZWWCrdHI"
          className='rounded-full h-8 w-8 object-cover'
          alt="mutual"
        />
        <p className='text-sm text-gray-400'>
          Archan and 3 other mutual connections
        </p>
      </div> */}

      <button 
      disabled= {loading}
      className='m-2 border rounded-full p-1 text-blue-900 hover:bg-blue-50 flex gap-2 justify-center cursor-pointer'
      onClick={ConnectIt}
      >
       <Plus />         {loading ? "Connecting..." : "Connect"}

      </button>
    </div>
  )
}

export default UserRequest