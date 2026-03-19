import { CalendarDays, Contact, Mails, UserPlus, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { db } from '../firestore'; 

const RightSideContainer = () => {
  const [totalConnections, setTotalConnections] = useState(0);

  const user_info = JSON.parse(localStorage.getItem('user_data')) || {};
  const loggedInUserId = user_info.id;

 useEffect(() => {
  let total = 0;

  const unsubscribeReceived = db.collection("mutual_connection")
    .where("receiver_id", "==", loggedInUserId)

    .where("recevier_status", "==", "accepted")
    .onSnapshot(snapshot => {
      total += snapshot.size;
      setTotalConnections(total);
    });

  const unsubscribeSent = db.collection("mutual_connection")
    .where("sender_id", "==", loggedInUserId)
    .where("recevier_status", "==", "accepted")
    .onSnapshot(snapshot => {
      total += snapshot.size;
      setTotalConnections(total);
    });

  return () => {
    unsubscribeReceived();
    unsubscribeSent();
  };
}, [loggedInUserId]);

  return (
    <div className='ml-50 mt-5'>

      <div className='h-76 w-84 font-semibold border bg-white rounded-lg'>
        <div className='border-b border-gray-400 p-4'>
          <h2 className='text-lg font-bold'>Manage my network</h2>
        </div>

        <div className='flex flex-col w-full'>
          <div className='flex flex-row justify-between items-center p-3 hover:bg-gray-100'>
            <h2 className='flex gap-2'><Contact /> Connections</h2>
            <span>{totalConnections}</span>
          </div>

          <div className='flex flex-row justify-between items-center p-3 hover:bg-gray-100'>
            <h2 className='flex gap-2'><UserPlus /> Following & Followers</h2>
          </div>

          <div className='flex flex-row justify-between items-center p-3 hover:bg-gray-100'>
            <h2 className='flex gap-2'><Users /> Groups</h2>
          </div>

          <div className='flex flex-row justify-between items-center p-3 hover:bg-gray-100'>
            <h2 className='flex gap-2'><CalendarDays /> Events</h2>
          </div>

          <div className='flex flex-row justify-between items-center p-3 hover:bg-gray-100'>
            <h2 className='flex gap-2'><Mails /> Newsletters</h2>
            <span>120</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default RightSideContainer;