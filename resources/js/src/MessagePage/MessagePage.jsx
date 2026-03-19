import React, { useEffect, useState } from "react";
import {db} from '../Dashboard/firestore';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";


const MessagePage = ({ usersMessage }) => {

  const navigate = useNavigate();
  const { chatId } = useParams();
    const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
    const userId = user_info.id;



  const [selectedUser, setSelectedUser] = useState(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);

  const handleUserClick = (user) => {
    setSelectedUser(user);
    console.log("Open chat with:", user);
    navigate(`/messages/${user.id}`)


    //   db
    //   .collection("mutual_connection")
    //   .doc(user.id)
    //   .collection("message") 
    //   .onSnapshot((snapshot) => {
    // snapshot.docChanges().forEach((change) => {
      
    //         console.log("New user: ", change.doc.data());            
    //         setMessages(...change.doc.data()); 
          
    //     });
    //   });


  };

useEffect(() => {
  if (!chatId) return;

  const unsubscribe = db
    .collection("mutual_connection")
    .doc(chatId)
    .collection("message")
    .orderBy("timestamp", "asc")
    .onSnapshot((snapshot) => {

      const allMessages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setMessages(allMessages);
    });

  return () => unsubscribe();

}, [chatId]);


 const sendMessage = () => {
    if (!messageInput.trim() || !selectedUser) return;


    db.collection('mutual_connection').doc(selectedUser.id).collection('message').add({
        text : messageInput , 
      sender_id : userId ,
      timestamp : new Date()
    })
    toast.success("Send")

    setMessageInput("");
  };

  if (!usersMessage) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex h-screen bg-[#ffeeee] text-black">


      <div className="w-1/4 border-r overflow-y-auto">

        <h2 className="p-4 font-bold text-lg">Messages</h2>


    {usersMessage && usersMessage.length > 0 ? (
  usersMessage.map((user) => {
    const avatar = user?.user?.data?.profile?.avatar
      ? `http://127.0.0.1:8000/storage/${user.user.data.profile.avatar}`
      : "https://via.placeholder.com/40";

    return (
      <div
        key={user.id}
        onClick={() => handleUserClick(user)}
        className={`flex items-center gap-3 p-3 cursor-pointer hover:bg-gray-100 border-b border-gray-300
          ${selectedUser?.id === user.id ? "bg-gray-200" : ""}`}
      >
        <img
          src={avatar}
          alt="avatar"
          className="w-10 h-10 rounded-full"
        />

        <div>
          <p className="font-semibold">{user?.user?.data?.name}</p>
          <p className="text-sm text-gray-500">Click to chat</p>
        </div>
      </div>
    );
  })
) : (
  <div className="text-center text-gray-400 p-5">
    No Users
  </div>
)}

      </div>


      <div className="flex flex-col w-3/4">

        {!selectedUser ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            Select a conversation
          </div>
        ) : (
          <>

            <div className="flex items-center gap-3 p-4 border-b">

              <img
                src={
                  selectedUser?.user?.data?.profile?.avatar
                    ? `http://127.0.0.1:8000/storage/${selectedUser.user.data.profile.avatar}`
                    : "https://via.placeholder.com/40"
                }
                className="w-10 h-10 rounded-full"
                alt="avatar"
              />

              <h3 className="font-bold text-black">
                {selectedUser?.user?.data?.name}
              </h3>

            </div>


            <div className="flex-1 overflow-y-auto p-4 space-y-3">

 {messages.map(msg => (
  <div
    key={msg.id}
    className={`max-w-xs p-2 rounded-lg ${
      msg.sender_id === userId ? "ml-auto bg-blue-500 text-white" : "bg-green-200 text-black"
    }`}
  >
    {msg.text}
  </div>
))}


            </div>


            <div className="p-3 border-t flex gap-2">

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 border rounded-lg p-2"
              />

              <button
                onClick={sendMessage}
                className="bg-blue-500 text-white px-4 rounded-lg"
              >
                Send
              </button>

            </div>

          </>
        )}

      </div>

    </div>
  );
};

export default MessagePage;