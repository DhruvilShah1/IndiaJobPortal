import React, { useState } from 'react'
import Modal from '../../../../Modal'
import { X } from 'lucide-react'
import { toast } from 'react-toastify'

const EditExperienceBox = ({ close, experience, setExperience }) => {
  const [title, setTitle] = useState(experience.title)
  const [company, setCompany] = useState(experience.company)
  const [employmentType, setEmploymentType] = useState(experience.employment_type)
  const [startDate, setStartDate] = useState(experience.start_date)
  const [endDate, setEndDate] = useState(experience.end_date)
  const [current, setCurrent] = useState(experience.current)
  const [description, setDescription] = useState(experience.description)
  const [skills, setSkills] = useState(experience.skills || [])
  const [skillInput, setSkillInput] = useState('')
  const [loading, setLoading] = useState(false)

  const addSkill = () => {
    if (skillInput.trim() && skills.length < 5 && !skills.includes(skillInput.trim())) {
      setSkills([...skills, skillInput.trim()])
      setSkillInput('')
    }
  }

  const removeSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setLoading(true)

      const res = await fetch(`http://127.0.0.1:8000/api/update/experience/${experience.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, company, employment_type: employmentType, start_date: startDate, end_date: endDate, current, description, skills }),
      })
      const data = await res.json()
      if (res.ok) {
        toast.success('Experience updated')
        setExperience(data.experience)
        close()
      } else {
        toast.error(data.message || 'Failed to update')
      }
          setLoading(false)
    } 



  return (
    <Modal close={close} width="700px">
      <div className="flex justify-between text-black items-center p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold">Edit Experience</h2>
        <button onClick={close}><X /></button>
      </div>

      <form onSubmit={handleSave} className="p-6 space-y-4 text-black">
        <div>
          <label className="font-semibold">Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="font-semibold">Company</label>
          <input value={company} onChange={e => setCompany(e.target.value)} className="w-full border rounded-md p-2" />
        </div>
        <div>
          <label className="font-semibold">Employment Type</label>
          <input value={employmentType} onChange={e => setEmploymentType(e.target.value)} className="w-full border rounded-md p-2" />
        </div>
        <div className="flex gap-2">
          <div>
            <label className="font-semibold">Start Date</label>
            <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="border rounded-md p-2" />
          </div>
          {!current && (
            <div>
              <label className="font-semibold">End Date</label>
              <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="border rounded-md p-2" />
            </div>
          )}
          <div className="flex items-center mt-6">
            <input type="checkbox" checked={current} onChange={e => setCurrent(e.target.checked)} className="mr-2" />
            <span>Currently working here</span>
          </div>
        </div>

        <div>
          <label className="font-semibold">Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows="4" className="w-full border rounded-md p-2" />
        </div>

        <div>
          <label className="font-semibold">Skills (max 5)</label>
          <div className="flex gap-2 mt-2">
            <input type="text" value={skillInput} onChange={e => setSkillInput(e.target.value)} className="border rounded-md p-2 flex-1" placeholder="Enter skill" />
            <button type="button" onClick={addSkill} className="px-4 py-2 bg-blue-600 text-white rounded-md">Add</button>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {skills.map((s, i) => (
              <span key={i} className="px-2 py-1 bg-gray-200 rounded-full text-xs flex items-center gap-1">
                {s} <button type="button" onClick={() => removeSkill(s)} className="text-red-500 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-4">
          <button type="button" onClick={close} className="px-4 py-2 border rounded-md">Cancel</button>
          <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default EditExperienceBox