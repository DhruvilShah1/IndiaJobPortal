import React, { useState } from "react";
import { Heart, ThumbsUp, MessageCircleMore, Send, Globe } from "lucide-react";
import { toast } from "react-toastify";

const RealPost = ({ post }) => {

  return (
    <div className="space-y-6">

     {post.map((item) => {

  const profile = item.profileData;
  const postData = item.postData[0];

  return (
    <PostCard
      key={item.firebaseId}
      firebaseId={item.firebaseId}
      profile={profile}
      postData={postData}
    />
  );
})}

    </div>
  );
};

export default RealPost;

const formatPostText = (text) => {
  const lines = text.split("\n");

  return lines.map((line, i) => (
    <p key={i} className="mb-1">
      {line.split(/(#\w+)/g).map((part, index) =>
        part.startsWith("#") ? (
          <span
            key={index}
            className="text-blue-600 font-semibold cursor-pointer hover:underline"
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </p>
  ));
};

function PostCard({ profile, postData , firebaseId  }) {

  const [showMore, setShowMore] = useState(false);
  const [mediaIndex, setMediaIndex] = useState(0);

  const media = postData.media || [];

  const next = () => {
    if (mediaIndex < media.length - 1) {
      setMediaIndex(mediaIndex + 1);
    }
  };

  const prev = () => {
    if (mediaIndex > 0) {
      setMediaIndex(mediaIndex - 1);
    }
  };

  return (

    <div className="bg-white border rounded-lg p-4">

      {/* PROFILE */}
      <div className="flex gap-3 items-center">

        <img
          src={`http://127.0.0.1:8000/storage/${profile.profile.avatar}`}
          className="w-12 h-12 rounded-full"
        />

        <div>
          <h3 className="font-bold">{profile.name}</h3>

          <p className="text-gray-500 text-sm line-clamp-1">
            {profile.profile.Headline}
          </p>

          <p className="flex gap-1 text-xs text-gray-400">
            5d <Globe size={14} />
          </p>
        </div>

      </div>


      {/* POST TEXT */}

      <div className="mt-3 text-sm">

     <p>
  {showMore
    ? formatPostText(postData.postText)
    : formatPostText(postData.postText.slice(0, 120) + "...")}
</p>

        {postData.postText.length > 120 && (
          <span
            className="text-blue-600 cursor-pointer font-semibold"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? " Show Less" : " Show More"}
          </span>
        )}

      </div>


{media.length > 0 && (
  <div className="mt-3 w-full relative overflow-hidden rounded-lg bg-gray-800">
    {media[mediaIndex].type === "image" && (
      <img
        src={`http://127.0.0.1:8000/storage/${media[mediaIndex].url}`}
        className="w-full  object-cover rounded-lg"
        alt=""
      />
    )}

    {media[mediaIndex].type === "video" && (
      <video controls className="w-full rounded-lg object-cover">
        <source
          src={`http://127.0.0.1:8000/storage/${media[mediaIndex].url}`}
          type="video/mp4"
        />
      </video>
    )}

    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-11/12 h-2 bg-gray-400 rounded-full overflow-hidden">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${((mediaIndex + 1) / media.length) * 100}%` }}
      ></div>
    </div>

    <div className="absolute top-3 right-3 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
      {mediaIndex + 1} / {media.length}
    </div>

    {media.length > 1 && (
      <>
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full hover:bg-black transition"
        >
          ◀
        </button>

        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 text-white px-3 py-2 rounded-full hover:bg-black transition"
        >
          ▶
        </button>
      </>
    )}
  </div>
)}


      <div className="flex justify-between mt-4 border-t pt-3 text-sm">

        <button className="flex items-center gap-1" onClick={()=>{ toast.success(firebaseId) }}>
          <ThumbsUp size={18} />
          Like
        </button>

        <button className="flex items-center gap-1">
          <MessageCircleMore size={18} />
          Comment
        </button>

        <button className="flex items-center gap-1">
          <Send size={18} />
          Share
        </button>

      </div>

    </div>
  );
}