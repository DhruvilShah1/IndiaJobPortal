import { Ellipsis } from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../../firestore";

const UserPost = ({setParticluarUSerpost ,  particularUserPosts }) => {
  const [mediaIndex, setMediaIndex] = useState({});
  const [menuOpen, setMenuOpen] = useState({});

  function deletePost(postId, firestoreId) {
    fetch(`http://127.0.0.1:8000/api/delete/post/${postId}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("user_token")}`,
        },
    })
    .then((res) => res.json())
    .then((data) => {
        if (data.success) {            
            db.collection("post")
              .doc(firestoreId)
              .delete()
              .then(() => {
               toast.success("Post deleted successfully");
                setParticluarUSerpost((prev) => prev.filter((post) => post.id !== postId));

              })
              .catch((err) => {
                console.error("Failed to delete post from Firestore:", err);
              });
              
        }
    })
    .catch((err) => {
        toast.error("Failed to delete post");
    });
    }


  const toggleMenu = (postId) => {
    setMenuOpen((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const next = (postId, length) => {
    setMediaIndex((prev) => ({
      ...prev,
      [postId]:
        prev[postId] >= length - 1 ? 0 : (prev[postId] || 0) + 1,
    }));
  };

  const prev = (postId, length) => {
    setMediaIndex((prev) => ({
      ...prev,
      [postId]:
        !prev[postId] || prev[postId] === 0
          ? length - 1
          : prev[postId] - 1,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        {particularUserPosts && particularUserPosts.length > 0 ? (
          particularUserPosts.map((post) => {
            const media = post.media || [];
            const currentIndex = mediaIndex[post.id] || 0;

            return (
              <div
                key={post.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden border"
              >
                {/* HEADER */}
                <div className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center gap-3">
                    <img
                      src={`http://127.0.0.1:8000/storage/${post.user?.avatar}`}
                      className="w-10 h-10 rounded-full object-cover"
                      alt=""
                    />
                    <div>
                      <h3 className="font-semibold text-sm">
                        {post.user?.name || "User"}
                      </h3>
                      <p className="text-xs text-gray-500">2h ago</p>
                    </div>
                  </div>

                    <div className="relative text-black">
                      <button
                        onClick={() => toggleMenu(post.id)}
                        className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
                      >
                        <Ellipsis size={20}/>
                      </button>

                      {menuOpen[post.id] && (
                        <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-20">
                          <button
                        onClick={() => deletePost(post.id, post.firestore?.firestoreId)}

                            className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
                          >
                            🗑 Delete Post
                          </button>
                        </div>
                      )}
                    </div>
              
                </div>

                {/* POST TEXT */}
                <div className="p-4">
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {post.postText}
                  </p>
                </div>

                {/* MEDIA */}
                {media.length > 0 && (
                  <div className="relative bg-black">
                    {media[currentIndex].type === "image" && (
                      <img
                        src={`http://127.0.0.1:8000/storage/${media[currentIndex].url}`}
                        className="w-full h-96 object-cover"
                        alt=""
                      />
                    )}

                    {media[currentIndex].type === "video" && (
                      <video controls className="w-full h-96 object-cover">
                        <source
                          src={`http://127.0.0.1:8000/storage/${media[currentIndex].url}`}
                          type="video/mp4"
                        />
                      </video>
                    )}

                    {/* SLIDER BUTTONS */}
                    {media.length > 1 && (
                      <>
                        <button
                          onClick={() => prev(post.id, media.length)}
                          className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                        >
                          ◀
                        </button>

                        <button
                          onClick={() => next(post.id, media.length)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 p-2 rounded-full"
                        >
                          ▶
                        </button>

                        {/* COUNTER */}
                        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
                          {currentIndex + 1}/{media.length}
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* FOOTER */}
                <div className="flex justify-around p-3 border-t text-sm text-gray-600">
                  <button className="hover:text-blue-600">👍 Like</button>
                  <button className="hover:text-blue-600">💬 Comment</button>
                  <button className="hover:text-blue-600">↗ Share</button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            No posts found for this user.
          </p>
        )}
      </div>
    </div>
  );
};

export default UserPost;