import React, { useContext, useState } from "react";
import Modal from "../../../../Modal"; // your existing modal component
import { X } from "lucide-react";
import { toast } from "react-toastify";
import { ExperienceContext } from "./ExperienceContext";

const AddExperienceBox = ({ close, AddExperience }) => {

  const {experiences , setExperiences } = useContext(ExperienceContext);

    const token = localStorage.getItem("user_token");

  const [form, setForm] = useState({
    title: "",
    employment_type: "",
    company: "",
    current: false,
    start_date: "",
    end_date: "",
    location: "",
    location_type: "",
    description: "",
  });

  const [skills, setSkills] = useState([]);
  const [skillInput, setSkillInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const addSkill = () => {
    if (skillInput.trim() && skills.length < 5 && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()]);
      setSkillInput("");
    }
  };

  const removeSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

   try {
  const user_info = JSON.parse(localStorage.getItem("user_data")) || {};
  const user_id = user_info.id;
  const payload = { user_id, ...form, skills };

  const res = await fetch("http://127.0.0.1:8000/api/create/experience", {
    method: "POST",
    headers: { "Content-Type": "application/json",               
       "Authorization": `Bearer ${token}`, 
 },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    if (data.errors) {
      Object.values(data.errors).forEach((err) => toast.error(err[0]));
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
    return;
  }

  toast.success("Experience added successfully");

  const newExperience = data.experience;

  setExperiences((experiences) => [...experiences, newExperience]);

  console.log("Updated experiences in context:", [...experiences, newExperience]);

  setLoading(false);
  close(); // close modal after success
} catch (error) {
      toast.error("Network error");
      console.error(error);
    } finally {
      setLoading(false);
      close();
    }
  };

  return (
    <Modal close={close} width="700px">
      <div className="flex justify-between items-center p-4 text-xl border-b border-gray-200 z-10">
        <h2>Add Experience</h2>
        <button onClick={close}><X /></button>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4 z-10">
        <div>
          <label className="block mb-1 font-semibold">Job Title*</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Ex: Software Engineer"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Employment Type*</label>
          <select
            name="employment_type"
            value={form.employment_type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            required
          >
            <option value="">Select</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Internship">Internship</option>
            <option value="Contract">Contract</option>
            <option value="Temporary">Temporary</option>
            <option value="Freelance">Freelance</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Company*</label>
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="Ex: AxesForce Technologies LLP"
            required
          />
        </div>

        <div className="flex gap-2 items-center">
          <div className="flex-1">
            <label className="block mb-1 font-semibold">Start Date*</label>
            <input
              type="date"
              name="start_date"
              value={form.start_date}
              onChange={handleChange}
              className="w-full border rounded-md p-2"
              required
            />
          </div>

          {!form.current && (
            <div className="flex-1">
              <label className="block mb-1 font-semibold">End Date</label>
              <input
                type="date"
                name="end_date"
                value={form.end_date}
                onChange={handleChange}
                className="w-full border rounded-md p-2"
              />
            </div>
          )}

          <div className="flex items-center mt-6 gap-1">
            <input
              type="checkbox"
              name="current"
              checked={form.current}
              onChange={handleChange}
            />
            <span className="text-sm">I am currently working in this role</span>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
            placeholder="City, State, Country"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Location Type</label>
          <select
            name="location_type"
            value={form.location_type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option value="">Select</option>
            <option value="On-site">On-site</option>
            <option value="Remote">Remote</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            className="w-full border rounded-md p-2"
            placeholder="Describe your responsibilities, achievements, and impact"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Skills</label>
          <p className="text-gray-500 text-sm mb-2">Top skills used in this role (max 5)</p>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              placeholder="Enter skill"
              className="flex-1 border rounded-md p-2"
            />
            <button
              type="button"
              onClick={addSkill}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="px-4 py-2 bg-gray-200 rounded-full text-sm flex items-center gap-1">
                {skill}
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 font-bold"
                >
                  ×
                </button>
              </span>
            ))}
          </div>

          {skills.length >= 5 && (
            <p className="text-red-500 text-sm mt-2">Maximum 5 skills allowed</p>
          )}
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddExperienceBox;