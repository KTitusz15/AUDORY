import { useState, useEffect } from 'react';
import { useLogin } from '../hooks/useLogin';
import logo from '../assets/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  useEffect(() => {
    document.title = 'Audory | Log in';
  });

  return (
    <div class='h-screen md:flex'>
      <div class='relative overflow-hidden md:flex w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center hidden'>
        <img
          src='https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt='Placeholder Image'
          class='object-cover w-full h-full hue-rotate-[270deg]'
        />
        <div class='fixed flex flex-col gap-10 line-clamp-2 '>
        <h1 class="type-login line-clamp-2 font-bold text-white md:text-xl lg:text-2xl xl:text-4xl w-[max-content] font-mono"></h1>
        </div>
      </div>

      <div class='flex flex-col h-screen md:w-1/2 justify-center py-10 items-center [background:radial-gradient(125%_125%_at_50%_10%,#000_55%,#4c00a3_100%)]'>
        <form
          class='px-10'
          onSubmit={handleSubmit}>
            
          <h1 className='text-6xl text-white font-semibold'>Audory</h1>
          <h1 class="md:hidden type-login mt-3 italic line-clamp-2 text-white text-sm w-[max-content] font-mono"></h1>
          <p class='text-lg font-semibold text-gray-300 my-7'>Welcome Back</p>
          
          <div class='relative inline-flex items-center w-full justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-600 to-indigo-900  py-0.5 px-0.5 rounded-lg mb-4'>
            <span className='flex px-2 w-full relative py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md  text-nowrap'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'>
                <path
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207'
                />
              </svg>
              <input
                class='outline-none border-none bg-gray-900 text-white pl-2 w-full'
                name='email'
                id='email'
                type='email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                autoComplete='off'
                placeholder='Email Address'
              />
            </span>
          </div>
          <div class='relative inline-flex items-center w-full justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 group bg-gradient-to-br from-purple-600 to-indigo-900  py-0.5 px-0.5 rounded-lg mb-4'>
            <span className='flex px-2 w-full relative py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md  text-nowrap'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                class='h-5 w-5 text-gray-400'
                viewBox='0 0 20 20'
                fill='currentColor'>
                <path
                  fill-rule='evenodd'
                  d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z'
                  clip-rule='evenodd'
                />
              </svg>
              <input
                class='outline-none border-none bg-gray-900 text-white pl-2 w-full'
                name='password'
                id='password'
                type='password'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder='Password'
              />
            </span>
          </div>

          <div className='flex justify-around items-center gap-3'>
            <button
              disabled={isLoading}
              className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-90 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-34'>
              <span className='flex justify-center relative px-16 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-nowrap w-32'>
                Log in
              </span>
            </button>
            <a
              href='/signup'
              className='relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-90 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 w-34'>
              <span className='flex justify-center relative px-14 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-nowrap w-32 text-center'>
                Sign up
              </span>
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
