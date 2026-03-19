import React, { useState } from "react";
import { ThumbsUp, MessageCircle, Flag, Send } from "lucide-react";

const PostContainer = () => {
  const [showMore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);

  const postText = `Excited to share that I am continuously learning and improving my Full Stack Development skills. 
Currently diving deeper into Machine Learning & AI while building real-world Laravel and React projects. 
Open to new opportunities and collaborations 🚀`;

  const limit = 120;

  return (
    <div className="w-90 border border-gray-500 rounded-md bg-white shadow-sm">

      {/* Header */}
      <div className="flex p-3 gap-2">
        <img
          src="https://media.istockphoto.com/id/1437816897/photo/business-woman-manager-or-human-resources-portrait-for-career-success-company-we-are-hiring.jpg?s=612x612&w=0&k=20&c=tyLvtzutRh22j9GqSGI33Z4HpIwv9vL_MZw_xOE19NQ="
          className="rounded-full h-15 w-15 object-cover"
        />

        <div className="flex flex-col">
          <h2 className="font-bold">Dhruvil Shah</h2>
          <p className="w-65     line-clamp-1 text-sm text-gray-400">
            IT Graduate | Full Stack Developer | Learning ML & AI
          </p>
          <span className="text-xs text-gray-400">2d ago</span>
        </div>
      </div>

      <div className="px-4 pb-2">
        <p className="text-sm whitespace-pre-line">
          {showMore ? postText : postText.slice(0, limit)}
        </p>

        {postText.length > limit && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-gray-600 text-sm font-medium hover:underline"
          >
            {showMore ? "Show less" : "... Show more"}
          </button>
        )}
      </div>

      <div>
        <img
          src="https://media.sproutsocial.com/uploads/2022/05/How-to-post-on-instagram-from-pc.jpg"
          className="w-full object-cover"
        />
      </div>

      <div className="flex justify-around items-center py-2 border-t text-gray-600 text-sm">
        
        <button
          onClick={() => setLiked(!liked)}
          className={`flex items-center gap-1 hover:bg-gray-100 px-3 py-2 rounded-md transition ${
            liked ? "text-blue-600 font-semibold" : ""
          }`}
        >
          <ThumbsUp size={18} />
          Like
        </button>

        <button className="flex items-center gap-1 hover:bg-gray-100 px-3 py-2 rounded-md transition">
          <MessageCircle size={18} />
          Comment
        </button>

        <button className="flex items-center gap-1 hover:bg-gray-100 px-3 py-2 rounded-md transition">
          <Flag size={18} />
          Report
        </button>

        <button className="flex items-center gap-1 hover:bg-gray-100 px-3 py-2 rounded-md transition">
          <Send size={18} />
          Send
        </button>

      </div>

    </div>
  );
};

export default PostContainer;