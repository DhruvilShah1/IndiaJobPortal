import { X } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import Modal from '../../../Modal';


const EditBox = ({ close , setProfile }) => {
  const user_info = JSON.parse(localStorage.getItem('user_data')) || {}
  const user_id = user_info.id

const [files, setFiles] = useState({
  avatar: null,
  cover_image: null
}); 

const handleFileChange = (e) => {
  setFiles({
    ...files,
    [e.target.name]: e.target.files[0]
  });
};

const token = localStorage.getItem('token');

  const defaultForm = {
  name: user_info.name || "",
  email: user_info.email || "",
  city: "",
  Headline: "",
  postcode: "",
  pronouns: "",
  location: "",
  show_experience: false
};

  const [formData, setFormData] = useState(defaultForm)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    console.log(files);

      const form = new FormData();

 Object.keys(formData).forEach((key) => {
  let value = formData[key];

  if (typeof value === "boolean") {
    value = value ? 1 : 0;
  }

  form.append(key, value);
});


  if (files.avatar) {
    form.append("avatar", files.avatar);
  }
  if (files.cover_image) {
    form.append("cover_image", files.cover_image);
  }

  form.append("user_id", user_id);

  
    
        const response = await fetch(
          "http://127.0.0.1:8000/api/create/profile",
          {
            method: "POST",          
                  headers: {
                   'Authorization': `Bearer ${token}`,

            "Accept": "application/json",
          },
    
              body: form
,
         }
        );
    
    const data = await response.json();
    console.log(response.status);
    console.log(data);
    
    
        if (response.ok) {
          console.log("Success:", data);
            toast.success(data.message)
                setProfile(data.profile);
                        setFormData(defaultForm)
                        close()


    
        }
        else{
    
    for (let i in data.errors){
      console.log(data.errors[i][0]);
      toast.error(data.errors[i][0])
    }
    

    }

  }


  return (

  <Modal close={close}>
      <div className='flex justify-between items-center p-3 text-xl border-b border-gray-200'>
        <h2>Editor</h2>
        <h2 className='cursor-pointer' onClick={close}>
          <X />
        </h2>
      </div>

      <div className='p-4'>
<form className='flex flex-col' onSubmit={handleSubmit} encType="multipart/form-data">
          
          <div className='flex flex-col gap-1'>
            <label>First Name*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              className="border pl-2 h-10 w-full rounded-md bg-gray-100"
              disabled
            />
          </div>

          <div className='flex flex-col gap-1'>
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              className="border pl-2 h-10 w-full rounded-md bg-gray-100"
              disabled
            />
          </div>

          <div className='flex flex-col gap-1'>
  <label>Avatar (Profile Picture)</label>
  <input
    type="file"
    name="avatar"
    accept="image/*"
    onChange={handleFileChange}
    className="border p-2 rounded-md"
  />
</div>

<div className='flex flex-col gap-1'>
  <label>Cover Image</label>
  <input
    type="file"
    name="cover_image"
    accept="image/*"
    onChange={handleFileChange}
    className="border p-2 rounded-md"
  />
</div>


          <div className='flex flex-col gap-1'>
            <label>Pronouns*</label>
            <select
              name="pronouns"
              value={formData.pronouns}
              onChange={handleChange}
              className="border pl-2 h-10 w-full rounded-md"
            >
              <option value="">Select pronouns</option>
              <option value="he/him">He/Him</option>
              <option value="she/her">She/Her</option>
              <option value="they/them">They/Them</option>
            </select>
          </div>

          <div className='flex flex-col gap-1'>
            <label>Headline*</label>
            <textarea
              name="Headline"
              value={formData.Headline}
              onChange={handleChange}
              rows="3"
              className="border p-2 w-full rounded-md resize-none"
              placeholder="Write your headline..."
            />
          </div>

          <div className='flex gap-3 mt-2'>
            <div className='flex flex-col'>
              <label>Location*</label>
              <input
                type='text'
                name='location'
                value={formData.location}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            </div>

            <div className='flex flex-col'>
              <label>PostCode*</label>
              <input
                type='text'
                name='postcode'
                value={formData.postcode}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            </div>

            <div className='flex flex-col'>
              <label>City*</label>
              <input
                type='text'
                name='city'
                value={formData.city}
                onChange={handleChange}
                className="border p-2 rounded-md"
              />
            </div>
          </div>

  <div>
  <input
    type="checkbox"
    className="mt-2"
    checked={formData.show_experience}
    onChange={(e) =>
      setFormData({
        ...formData,
        show_experience: e.target.checked
      })
    }
  />
  <label>Show Experience</label>
</div>


          <button
            type='submit'
            className='my-3 p-3 text-white bg-green-500 border-2 border-black rounded-xl cursor-pointer'
          >
            Save
          </button>
        </form>
      </div>
    </Modal>
  )
}

export default EditBox
