import React, { useEffect } from 'react'
import RightSideCompnent from './RightSideCompnent'
import AboutSection from './AboutSection1/AboutSection'
import MainPost from './PostSection/MainPost'
import MainExperience from './ExperienceSection/MainExperience'
import {db} from '../firestore'
import { useParams } from 'react-router-dom'
import { log10 } from 'firebase/firestore/pipelines'

const ProfileFullPage = ({profile , education , setProfile }) => {

  const {id} = useParams();

//  useEffect(() => {

//   fetch(`http://127.0.0.1:8000/api/get/user/${id}`)
//     .then(res => res.json())
//     .then(data => {
//       console.log(data.data.profile);
//     });

// }, [id]);


  return (
    <div className=''>

<div className='flex flex-col bg-[#ffeeee]'>
      <RightSideCompnent profile={profile} education={education} setProfile ={setProfile }/>

      <AboutSection/>

      <MainPost profile={profile} />

      <MainExperience/>

    

</div>
    </div>
  )
}

export default ProfileFullPage
