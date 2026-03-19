import React, { useState, useEffect } from 'react';
import Modal from '../../../../Modal';
import { X, Image, Video } from 'lucide-react';
import { toast } from 'react-toastify';
import { db } from '../../firestore';

const AddPost = ({ close, profile }) => {
  const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
  const user_id = user_info.id;
  console.log("The user ID is ", user_id);
  
  const token = localStorage.getItem("user_token");
  const [step, setStep] = useState(1); 
  const [postText, setPostText] = useState("");
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    return () => {
      images.forEach(img => URL.revokeObjectURL(img));
      if (video) URL.revokeObjectURL(video);
    };
  }, [images, video]);

  if (!profile) {
    return (
      <Modal close={close}>
        <p className='p-5'>Loading...</p>
      </Modal>
    );
  }

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (video) {
      alert("Cannot select images while a video is selected.");
      return;
    }
    if (images.length + files.length > 5) {
      alert("Maximum 5 images allowed");
      return;
    }
    setImages(prev => [...prev, ...files]);
    setStep(2); 
  };

  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (images.length > 0) {
      alert("Cannot select video while images are selected.");
      return;
    }
    if (!file) return;
    setVideo(file);
    setStep(2);
  };

  const removeImage = (index) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (updated.length === 0 && !video) setStep(1);
  };

  const removeVideo = () => {
    setVideo(null);
    setStep(1);
  };

const handlePost = async () => {
  if (!postText && images.length === 0 && !video) return;

  setLoading(true);

  const formData = new FormData();
  formData.append("postText", postText);
  formData.append("user_id", user_id);

  images.forEach((img) => {
    formData.append("media[]", img);
  });

  if (video) {
    formData.append("media[]", video);
  }

  try {
    const res = await fetch("http://127.0.0.1:8000/api/create/post", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`, 
      },
      body: formData
    });

    const data = await res.json();

    if (data) {
      db.collection("post")
        .add({
          postId: data.id,
          timestamp: new Date()
        })
        .then(() => {
          toast.success("Posted successfully");
          setLoading(false);
          close()
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  } catch (error) {
    console.error(error);
    toast.error("Post failed");
    setLoading(false);
  }
};

  return (
    <Modal close={close}>
      <div className='flex justify-between items-center p-3 border-b border-gray-300'>
        <h1 className='text-lg font-semibold'>Create a Post</h1>
        <div className='cursor-pointer rounded-full bg-gray-200 p-1'>
          <X size={20} onClick={close} />
        </div>
      </div>

<form encType="multipart/form-data">
        <div className='p-4 flex gap-3 items-center'>
          <img
            src={`http://127.0.0.1:8000/storage/${profile.avatar}`}
            className='rounded-full h-14 w-14 object-cover'
            alt="profile"
          />
          <div>
            <h3 className='font-semibold'>{user_info.name}</h3>
            <p className='text-sm text-gray-400'>Post to anyone</p>
          </div>
        </div>

        {step === 1 && (
          <div className='p-4'>
            <textarea
              placeholder="What do you want to talk about?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className='w-full h-32 border-none outline-none resize-none mb-3'
            />
            <div className='flex gap-3 mb-3'>
              <label className='flex items-center gap-2 cursor-pointer text-blue-600'>
                <Image size={20} /> Add Images
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  className='hidden'
                  onChange={handleImageUpload}
                />
              </label>
              

              <label className='flex items-center gap-2 cursor-pointer text-green-600'>
                <Video size={20} /> Add Video
                <input
                  type="file"
                  accept="video/*"
                  className='hidden'
                  onChange={handleVideoUpload}
                />
              </label>
            </div>

            <div className='flex justify-end'>
              <button
                type="button"
                onClick={handlePost}
                disabled={!postText && images.length === 0 && !video || loading}
                className={`px-4 py-2 rounded text-white ${
                  !postText && images.length === 0 && !video
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600"
                }`}
              >
                {loading ? "Posting..." : "Post"}
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className='p-4'>
            {images.length > 0 && (
              <>
                <div className='grid grid-cols-3 gap-2 mb-3'>
                  {images.map((img, i) => (
                    <div key={i} className='relative'>
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className='h-28 w-full object-cover rounded'
                      />
                      <button
                        className='absolute top-1 right-1 bg-black text-white rounded-full p-1'
                        onClick={() => removeImage(i)}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
                {images.length < 5 && (
                  <label className='flex items-center gap-2 cursor-pointer text-blue-600 mb-3'>
                    <Image size={20} /> Add More Images
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className='hidden'
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </>
            )}

            {video && (
              <div className='relative mb-3'>
                <video
                  src={URL.createObjectURL(video)}
                  className='h-48 w-full object-cover rounded'
                  controls
                />
                <button
                  className='absolute top-1 right-1 bg-black text-white rounded-full p-1'
                  onClick={removeVideo}
                >
                  <X size={14} />
                </button>
              </div>
            )}

            <div className='flex justify-end gap-3'>
              <button onClick={() => setStep(1)} className='px-4 py-2 border rounded'>Back</button>
              <button onClick={() => setStep(3)} className='px-4 py-2 bg-blue-600 text-white rounded'>Next</button>
              <button onClick={close} className='px-4 py-2 border rounded'>Cancel</button>
            </div>
          </div>
        )}

        {/* Step 3: Final review */}
        {step === 3 && (
          <div className='p-4'>
            <textarea
              placeholder="What do you want to talk about?"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className='w-full h-32 border-none outline-none resize-none mb-3'
            />
            {images.length > 0 && (
              <div className='grid grid-cols-3 gap-2 mb-3'>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className='h-28 w-full object-cover rounded'
                  />
                ))}
              </div>
            )}
            {video && (
              <div className='mb-3'>
                <video
                  src={URL.createObjectURL(video)}
                  className='h-48 w-full object-cover rounded'
                  controls
                />
              </div>
            )}

            <div className='flex justify-end gap-3'>
              <button onClick={() => setStep(2)} className='px-4 py-2 border rounded'>Back</button>
              <button
                type="button"
                onClick={handlePost}
                disabled={!postText && images.length === 0 && !video || loading}
                className='px-4 py-2 bg-blue-600 text-white rounded'
              >
                {loading ? "Posting..." : "Post"}
              </button>
              <button onClick={close} className='px-4 py-2 border rounded'>Cancel</button>
            </div>
          </div>
        )}
      </form>
    </Modal>
  );
};

export default AddPost;