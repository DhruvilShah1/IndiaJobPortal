import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Briefcase, Pencil, Trash } from 'lucide-react'
import EditExperienceBox from './EditExperienceBox'
import { toast } from 'react-toastify'

const ExperienceDetail = () => {
  const { user_id } = useParams() 
  console.log(user_id);
  
  const [experiences, setExperiences] = useState([])
  const [loading, setLoading] = useState(true)
  const [editOpen, setEditOpen] = useState(false)
  const [currentExperience, setCurrentExperience] = useState(null)

  const fetchExperiences = async () => {
    try {
      setLoading(true)
      const res = await fetch(`http://127.0.0.1:8000/api/get/experience/${user_id}`)
      const data = await res.json()
      if (data.success) {
        setExperiences(data.experiences)
      }
    } catch (err) {
      console.error('Error fetching experiences:', err)
      toast.error('Failed to load experiences')
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchExperiences()
  }, [])

  const handleDelete = async (expId) => {
    if (!window.confirm('Are you sure you want to delete this experience?')) return
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/delete/experience/${expId}`, {
        method: 'DELETE',
      })
      if (res.ok) {
        toast.success('Experience deleted successfully')
        setExperiences(experiences.filter(exp => exp.id !== expId))
      } else {
        toast.error('Failed to delete experience')
      }
    } catch (err) {
      toast.error('Server error')
    }
  }

  if (loading) return <p className='text-gray-500 p-4'>Loading experiences...</p>
  if (experiences.length == 0) return <p className='text-gray-500 p-4'>No experiences found. Please add experience.</p>

   return (
    <div className="bg-[#f9f9f9] min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">

        {experiences.length === 0 && (
          <p className="text-gray-500 text-center py-10">
            No experiences found. Add your professional experiences to display here.
          </p>
        )}

        {experiences.map((exp) => (
          <div key={exp.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full bg-gray-200 flex items-center justify-center">
                <Briefcase className="text-gray-500" size={24} />
              </div>
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">{exp.title}</h2>
                  <p className="text-sm text-gray-600">
                    {exp.company} | {exp.employment_type}
                  </p>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => { setCurrentExperience(exp); setEditOpen(true) }}
                    className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(exp.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              </div>

              {exp.description && (
                <p className="text-gray-700 mt-2 whitespace-pre-line text-sm">{exp.description}</p>
              )}

              {exp.skills && exp.skills.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {exp.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {editOpen && currentExperience && (
          <EditExperienceBox
            close={() => setEditOpen(false)}
            experience={currentExperience}
            setExperience={(updatedExp) => {
              setExperiences(experiences.map((exp) => exp.id === updatedExp.id ? updatedExp : exp))
              setCurrentExperience(updatedExp)
            }}
          />
        )}
      </div>
    </div>
  )
}


export default ExperienceDetail