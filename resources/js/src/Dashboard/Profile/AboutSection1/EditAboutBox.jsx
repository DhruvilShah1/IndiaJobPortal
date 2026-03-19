import React, { useEffect, useState } from "react";
import Modal from "../../../../Modal";
import { X } from "lucide-react";
import { toast } from "react-toastify";

const EditAboutBox = ({ close, aboutText, setAboutText }) => {
  const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
  const user_id = user_info.id;

  const token = localStorage.getItem("user_token");

  

  const [text, setText] = useState(aboutText);
  const [loading, setLoading] = useState(false);


    useEffect(() => {
    setText(aboutText);
  }, [aboutText]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/create/about", {
        method: "POST",
        headers: { "Content-Type": "application/json",         
                  "Authorization": `Bearer ${token}`, 
 },
        body: JSON.stringify({ user_id: user_id, aboutText: text }),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          Object.values(data.errors).forEach((errorArray) => toast.error(errorArray[0]));
        } else toast.error("Something went wrong");
        setLoading(false);
        return;
      }

      toast.success("Profile updated successfully");
      setAboutText(text);
      close();
    } catch (error) {
      toast.error("Server error");
    }

    setLoading(false);
  };

  return (
    <Modal close={close} width="700px">
      <div className="flex justify-between items-center p-4 text-xl text-black border-b border-gray-200">
        <h2>Edit Profile</h2>
        <button onClick={close}><X /></button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6 text-black">
        <div>
          <h3 className="font-semibold mb-2">About</h3>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="8"
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write something about yourself..."
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button type="button" onClick={close} className="px-4 py-2 border rounded-md">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50">
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default EditAboutBox;