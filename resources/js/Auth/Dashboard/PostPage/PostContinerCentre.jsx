  import React, { useEffect, useRef } from 'react'
  import PostSearchBar from './PostSearchBar'
  import RealPost from './RealPost'

  const PostContinerCentre = ({profile , setpostLimit , post}) => {




    

   const loaderRef = useRef(null)

  useEffect(() => {

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setpostLimit(prev => prev + 5) 
        }
      },
      { threshold: 1 }
    )

    if (loaderRef.current) {
      observer.observe(loaderRef.current)
    }

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current)
    }

  }, [])

    return (
  <div className="mt-5 w-full max-w-[150px] sm:max-w-[300px] md:max-w-[500px] lg:max-w-[600px] gap-2 text-black p-4 flex flex-col items-center">
  <div className='hidden lg:block'>
      <PostSearchBar profile={profile}/>

  </div>

<RealPost post={post}/>




    <div ref={loaderRef} className="h-10 flex items-center justify-center">
        Loading more posts...
      </div>

  </div>
    )
  }

  export default PostContinerCentre
