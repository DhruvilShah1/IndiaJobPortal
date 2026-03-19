import React, { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./src/component/LoginRegisterComponent/Register";
import LoginUser from "./src/component/LoginRegisterComponent/LoginUser";
import Dashboard from "./src/Dashboard/PostPage/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import DashboardLayout from "./src/Dashboard/DashboardLayout";
import FullNetwork from "./src/Dashboard/NetworkPage/FullNetwork";
import ProfileFullPage from "./src/Dashboard/Profile/ProfileFullPage";
import ExperienceDetail from "./src/Dashboard/Profile/ExperienceSection/ExperienceDetail";
import ProtectedUserRouteURL from "./Auth/ProtectedUserRouteURL";
import EditAboutBox from "./src/Dashboard/Profile/AboutSection1/EditAboutBox";
import MessagePage from "./src/MessagePage/MessagePage";

import { db } from "./src/Dashboard/firestore";
import AuthRoute from "./Auth/AuthRoute";
import { ExperienceContext, ExperienceProvider } from "./src/Dashboard/Profile/ExperienceSection/ExperienceContext";
import GoogleCallback from "./src/component/LoginRegisterComponent/GoogleCallback";
import SetPassword from "./src/component/SetPassword";
import UserPost from "./src/Dashboard/Profile/PostSection/UserPost";
import { log } from "firebase/firestore/pipelines";

function App() {
    const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
    const userId = user_info.id;

    console.log(user_info.id);
      const token = localStorage.getItem("user_token");

    

    const [post , setPosts] = useState([])


    useEffect(() => {
        fetchProfile();
        fetchExpericne();
        fetchUser();
        fetchMutualConnection();
        fetchPostByUserId();
        fetchPost();
    }, []);

    const [usersMessage, setUsersMessage] = useState([]);

    const [user, SetUser] = useState([]);
    const [profile, setProfile] = useState(null);
    const [page, setPage] = useState(1);
    const [postLimit,setpostLimit] = useState(2)
    const [particluarUSerpost, setParticluarUSerpost] = useState([]);


    const [education, setEducation] = useState([]);



    const fetchUser = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/user?page=${page}&limit=1`,{
              method : "GET" ,
                headers : {
                "Authorization": `Bearer ${token}`, 
              }
            });
            const result = await res.json();

            SetUser((prev) => [...prev, ...result.data.data]);

            console.log("In Background Networking is Running");
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    const fetchMutualConnection = () => {
        console.log("In Background Messaging is Running");

        db.collection("mutual_connection")
            .where("recevier_status", "==", "accepted")
            .onSnapshot(async (snapshot) => {
                for (const doc of snapshot.docs) {
                    if (("recevier_status", "==", "accepted")) {
                        const data = doc.data();

                        const senderID = data.sender_id;
                        const receiverID = data.receiver_id;

                        let otherUserId = null;

                        if (senderID === userId) {
                            otherUserId = receiverID;
                        } else if (receiverID === userId) {
                            otherUserId = senderID;
                        }

                        if (otherUserId) {
                            const res = await fetch(`http://127.0.0.1:8000/api/get/user/${otherUserId}`,{
              method : "GET" ,
                headers : {
                "Authorization": `Bearer ${token}`, 
              }
            });
                            const userData = await res.json();

                            let newData = {
                                id: doc.id,
                                connection: data,
                                user: userData,
                            };

                            setUsersMessage((prev) => [...prev, newData]);
                        }
                    }
                }
            });
    };

    const fetchExpericne = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/get/user/${userId}`, {
              method : 'GET', 
              headers : {
                "Authorization": `Bearer ${token}`, 
              }
            });

            const data = await res.json();

            setEducation(data.data.experience);
            console.log("In Background expereinceData is Running");
        } catch (error) {
            console.log(error);
        }
    };



    const fetchProfile = async () => {
        try {
            const res = await fetch(`http://127.0.0.1:8000/api/get/data/${userId}`,{
              method : "GET" ,
                headers : {
                "Authorization": `Bearer ${token}`, 
              }
            });

            const data = await res.json();

            setProfile(data.profile);
            console.log("In Background profileData is Running");
        } catch (error) {
            console.log(error);
        }

    };
 

    const fetchPost = () => {
  const unsubscribe = db.collection("post").onSnapshot(async (snapshot) => {

    const postList = [];

    for (const doc of snapshot.docs) {
      const data = doc.data();

      const respostData = await fetch(
        `http://127.0.0.1:8000/api/get/post/${data.postId}?postLimit=2`, {
              method : "GET" ,
                headers : {
                "Authorization": `Bearer ${token}`, 
              }
            }
        
      );
      const postData = await respostData.json();

      const resprofileData = await fetch(`http://127.0.0.1:8000/api/get/user/${postData.data[0].user_id}`,
        {
              method : "GET" ,
                headers : {
                  
                "Authorization": `Bearer ${token}`, 
              }
            }
      );
      const profileData = await resprofileData.json();

      const combinedPost = {
        firebaseId: doc.id,
        postData: postData.data,
        profileData: profileData.data,
      };

      postList.push(combinedPost);
    }

    setPosts(postList);
  });

  return unsubscribe;
};

const fetchPostByUserId = async () => {
  try {
    const res = await fetch(
      `http://127.0.0.1:8000/api/get/user/posts/${userId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    const postIds = data.map((post) => post.id);

    if (!postIds || postIds.length === 0) {
  console.log("No postIds → skipping Firestore query");

  // still update UI
  setParticluarUSerpost(data);
  return;
}

    const snapshot = await db
      .collection("post")
      .where("postId", "in", postIds)
      .get();

    let firestoreMap = {};



    snapshot.forEach((doc) => {
      const docData = doc.data();
      firestoreMap[docData.postId] = {
        firestoreId: doc.id,
        ...docData,
      };
    });

    const mergedPosts = data.map((post) => ({
      ...post,
      firestore: firestoreMap[post.id] || null,
    }));

    console.log("Merged Posts:", mergedPosts);

    if(mergedPosts){
    setParticluarUSerpost(mergedPosts);

    }else{
      setParticluarUSerpost([]);
    }


  } catch (error) {
    console.error("Error:", error);
  }
};



    return (
        <div>


            <ToastContainer />


<ExperienceProvider>
    <Routes>
      <Route
        path="/"
        element={
          <AuthRoute>
            <Register />
          </AuthRoute>
        }
      />
      <Route
        path="/login"
        element={
          <AuthRoute>
            <LoginUser />
          </AuthRoute>
        }
      />

      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path='/set-password' element={<SetPassword/>}/>

        <Route path="/google/callback" element={<GoogleCallback/>}/>
        <Route
          path="/dashboard"
          element={<Dashboard profile={profile} setpostLimit={setpostLimit} post={post} />}
        />
        
        <Route path="/network" element={<FullNetwork user={user} setPage={setPage} />} />
        <Route
          path="/profile/:id"
          element={
            <ProfileFullPage
              profile={profile}
              education={education}
              setProfile={setProfile}
            />
          }
        />
        <Route path="/profile/:id/edit/about" element={<ProfileFullPage />} />
        <Route path="/profile/:id/edit/profile" element={<ProfileFullPage />} />
        <Route path="/dashboard/:id/add/experience" element={<Dashboard />} />
        <Route
          path="/detail/experience/:user_id"
          element={
            <ProtectedUserRouteURL userIdFromUrl={userId}>
              <ExperienceDetail />
            </ProtectedUserRouteURL>
          }
        />
        <Route path="/jobs" element={<h1>Jobs Page</h1>} />
        <Route path="/user/activity" element={<UserPost setParticluarUSerpost={setParticluarUSerpost} particularUserPosts={particluarUSerpost} />} />
        <Route path="/messages" element={<MessagePage usersMessage={usersMessage} />} />
        <Route path="/messages/:chatId" element={<MessagePage usersMessage={usersMessage} />} />
        <Route path="/notifications" element={<h1>Notifications Page</h1>} />
      </Route>
    </Routes>
</ExperienceProvider>

        </div>
    );
}

export default App;
