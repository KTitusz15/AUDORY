import React from 'react'

const GenreCard = ({genre, link}) => {
  return (
    <div
    className='relative group flex flex-col justify-center items-center border shadow-sm rounded-xl border-gray-700'
            >
            <div className='flex justify-center items-center'>
              <div className='absolute flex z-10'>
                <p className=' text-3xl font-semibold text-gray-300'>
                    {genre}
                </p>
              </div>
              <img
                className='rounded-xl opacity-50 z-0 hue-rotate-[300deg]'
                src={`${link}`}
                alt=''
              />
            </div>
          </div>
  )
}

export default GenreCard