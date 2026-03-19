import { X } from 'lucide-react'
import React, { useRef, useState } from 'react'


const OpenPostBox = () => {
  const fileInputRef = useRef(null);

  

  const [image, setImage] = useState(null);
  const [step, setStep] = useState(1); 

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40">
      <div className="w-[800px] h-[500px] bg-white border shadow-lg rounded-md flex flex-col">

        {/* Header */}
        <div className='flex justify-between items-center border-b border-gray-200 p-4'>
          <div className='text-2xl'>Editor</div>
        </div>

        {step === 1 && (
          <div className='flex justify-center flex-col gap-2 items-center flex-1'>
            <img
              src='https://repository-images.githubusercontent.com/229240000/2b1bba00-eae1-11ea-8b31-ea57fe8a3f95'
              className='h-20'
              alt=""
            />
            <h1 className='text-2xl font-medium'>Select the File</h1>
            <p className='text-gray-400'>
              Share images or a single video in your post.
            </p>

            <button
              className='border w-60 p-2 rounded-md bg-blue-500 text-white cursor-pointer'
              onClick={handleButtonClick}
            >
              Upload From Computer
            </button>

            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            {image && (
              <button
                className="mt-4 px-6 py-2 bg-green-500 text-white rounded"
                onClick={() => setStep(2)}
              >
                Next
              </button>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-4 p-4 flex-1">
            <img
              src={image}
              alt="preview"
              className="h-60 object-contain border"
            />

            <textarea
              placeholder="Write text here..."
              className="border p-2 rounded h-24 resize-none"
            />

            <button className="self-end px-6 py-2 bg-blue-500 text-white rounded">
              Submit
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default OpenPostBox;
