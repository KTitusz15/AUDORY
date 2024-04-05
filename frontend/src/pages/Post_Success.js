import React from 'react'
import { Link } from 'react-router-dom'

const Post_Success = () => {
  return (
    <div className='success'>
        <div className='background'></div>

        <div className='flex flex-col text-6xl gap-3 justify-center items-center w-full h-screen text-white'>
            <span>Upload successful!</span>
            <span>Check it out <Link to="/feedback" className='font-bold'>here</Link></span>
        </div>
    </div>
  )
}

export default Post_Success