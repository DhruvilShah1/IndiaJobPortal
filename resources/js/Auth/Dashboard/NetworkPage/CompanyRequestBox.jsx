import React, { useState } from 'react';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firestore';
import { toast } from 'react-toastify';

const CompanyRequestBox = ({  user, requestId }) => {

  const [loading, setLoading] = useState(false);
console.log(user);

  

  const handleAction = async (status) => {
    setLoading(true);
    try {

      db.collection('mutual_connection').doc(requestId).update({
            recevier_status: status,         
        receiver_status_time: new Date(),
      })

      toast.success(`Request ${status} successfully!`)

    } catch (error) {
      console.error("Error updating request:", error);
    } finally {
      setLoading(false);
    }
  };

return (
  <div
    id={`request-${requestId}`}
    className="p-3 flex gap-2 items-center border-b border-gray-200"
  >
    <div>
      {user.senderDetails?.data?.profile?.avatar ? (
        <img
          src={`http://127.0.0.1:8000/storage/${user.senderDetails.data.profile.avatar}`}
          alt="User Avatar"
          className="h-17 w-17 rounded-full object-cover"
        />
      ) : (
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRI1tUxcvmYS-IZNWXVG5FRq3jbcND8WPV7w&s"
          alt="Default Avatar"
          className="h-17 w-17 rounded-full object-cover"
        />
      )}
    </div>

    <div>
      <p className="text-base font-bold text-black">
        {user.senderDetails?.data?.name || "Unknown User"}
      </p>
      <p>{user.senderDetails?.data?.profile?.Headline || "Headline Not Added"}</p>
    </div>

    <div className="flex gap-5 ml-auto">
      <button
        disabled={loading}
        onClick={() => handleAction('ignored')}
        className="p-3 cursor-pointer font-bold text-gray-600 hover:bg-gray-100 rounded flex items-center"
      >
        {loading ? "⏳ Ignoring..." : "Ignore"}
      </button>
      <button
        disabled={loading}
        onClick={() => handleAction('accepted')}
        className="border p-3 text-blue-600 cursor-pointer rounded-full hover:bg-blue-50 flex items-center"
      >
        {loading ? "⏳ Accepting..." : "Accept"}
      </button>
    </div>
  </div>
);
}
  

export default CompanyRequestBox;