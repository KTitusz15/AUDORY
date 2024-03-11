import React from 'react';

const Filter = () => {
  return (
      <div class='z-50 relative inline-block text-left dropdown'>
                <span class='rounded-md shadow-sm'>
                  <button
                    class='self-center relative inline-flex items-center justify-between p-0.5 overflow-hidden text-sm font-medium text-white rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-90'
                    type='button'
                    aria-haspopup='true'
                    aria-expanded='true'
                    aria-controls='headlessui-menu-items-117'>
                    <span className='flex bg-gray-900 justify-between w-full gap-4 relative px-4 py-2.5 transition-all ease-in duration-75  rounded-md group-hover:bg-opacity-0'>
                      Popular
                      <svg
                        class='w-5 h-5'
                        viewBox='0 0 20 20'
                        fill='currentColor'>
                        <path
                          fill-rule='evenodd'
                          d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                          clip-rule='evenodd'></path>
                      </svg>
                    </span>
                  </button>
                </span>
                <div class='opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-left -translate-y-2 scale-95'>
                  <div
                    class='absolute left-0 px-5 py-2.5 mt-2 origin-top-left [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#4c00a3_100%)] border border-gray-700 text-white divide-y divide-gray-400 rounded-md shadow-2xl outline-none'
                    aria-labelledby='headlessui-menu-button-1'
                    id='headlessui-menu-items-117'
                    role='menu'>
                    
                    <div class='py-1'>
                      <a
                        href='javascript:void(0)'
                        tabindex='0'
                        class='text-white flex justify-start w-full px-4 py-2 text-sm leading-5 text-left'
                        role='menuitem'>
                        Popular
                      </a>
                      <a
                        href='javascript:void(0)'
                        tabindex='1'
                        class='text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                        role='menuitem'>
                        New
                      </a>
                      <a
                        href='javascript:void(0)'
                        tabindex='2'
                        class='text-white flex justify-between w-full px-4 py-2 text-sm leading-5 text-left'
                        role='menuitem'>
                        Liked
                      </a>
                    </div>
                    
                  </div>
                </div>
              </div>
  );
};

export default Filter;
