import React from 'react'

const BubbleNav = () => {
  return (
    <div class='hidden fixed right-0 bottom-0 m-3 lg:m-4 xl:m-5 md:inline-block dropdown z-10'>
        <div class='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-center translate-y-10 scale-95'>
                <div
                  class='absolute flex flex-col justify-between items-center right-0 -top-48 w-11 xl:w-14 p-3 mt-2 origin-center [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#4c00a3_100%)] border border-gray-700 text-white divide-y divide-gray-400 rounded-full shadow-2xl outline-none'
                  aria-labelledby='headlessui-menu-button-1'
                  id='headlessui-menu-items-117'
                  role='menu'>
                  <a href='/publish' className='py-3'>
                  <svg className='hover:scale-110 hover:stroke-purple-200 transition-all duration-150' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </a>
                  <a href='/' className='py-3'>
                  <svg className='hover:scale-110 hover:stroke-purple-200 transition-all duration-150' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9"/><path d="M9 22V12h6v10M2 10.6L12 2l10 8.6"/></svg>
                  </a>
                  <a href='/profile' className='py-3'>
                  <svg className='hover:scale-110 hover:stroke-purple-200 transition-all duration-150' xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                  </a>
                </div>
              </div>
              <span class='rounded-md shadow-sm'>
                <button
                  class='self-center relative inline-flex items-center justify-between p-0.5 overflow-hidden text-sm font-medium text-white rounded-full group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-90'
                  type='button'
                  aria-haspopup='true'
                  aria-expanded='true'
                  aria-controls='headlessui-menu-items-117'>
                  <span className='flex bg-gray-900 justify-between w-full gap-4 relative p-2.5 xl:p-4 transition-all ease-in duration-75  rounded-full group-hover:bg-opacity-0'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 15l-6-6-6 6"/></svg>
                  </span>
                </button>
              </span>
              
            </div>
  )
}

export default BubbleNav