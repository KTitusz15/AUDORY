import { useState } from 'react';
import { usePostsContext } from '../hooks/usePostsContext';
import { useAuthContext } from '../hooks/useAuthContext';

const PostForm = () => {
  const { dispatch } = usePostsContext();
  const { user } = useAuthContext();

  const [title, setTitle] = useState('');
  const [genre, setGenre] = useState('');
  const [link, setLink] = useState('');
  const [desc, setDesc] = useState('');
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError('You must be logged in');
      return;
    }

    const post = { title, genre, link, desc };

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      if (Array.isArray(json.emptyFields)) {
        setEmptyFields(json.emptyFields);
      } else {
        setEmptyFields([]);
      }
    }
    if (response.ok) {
      setTitle('');
      setGenre('');
      setLink('');
      setDesc('');
      setError(null);
      setEmptyFields([]);
      dispatch({ type: 'CREATE_POST', payload: json });
      window.location.href = "/feedback"
    }
  };

  return (
    <div className='relative mx-auto w-10/12 mt-28 p-8 mb-20 bg-gray-900 shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-90 border border-gray-700 text-white self-center'>
      <form
        className='create'
        onSubmit={handleSubmit}>
        <div
          className={`flex flex-col ${
            currentStep !== 1 ? 'hidden' : ''
          } justify-center items-center gap-6`}
          id='phaseTitle'>
          <div className='md:text-2xl font-semibold mb-6'>
            Pick an amazing name for your idea
          </div>
          <input
            type='text'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className={`${
              emptyFields.includes('title') ? 'error' : ''
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-8/12 mx-auto p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900`}
          />
          {currentStep === 1 && (
            <div onClick={handleNextStep}>
              <svg
                className='hover:scale-110 hover:translate-x-1 hover:cursor-pointer active:scale-95 transition-all stroke-gray-300 hover:stroke-white'
                xmlns='http://www.w3.org/2000/svg'
                width='25'
                height='25'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#ffffff'
                strokeWidth='3'
                strokeLinecap='round'
                strokeLinejoin='round'>
                <path d='M5 12h13M12 5l7 7-7 7' />
              </svg>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col ${
            currentStep !== 2 ? 'hidden' : ''
          } justify-center items-center gap-6`}
          id='phaseGenre'>
          <div className='md:text-2xl font-semibold mb-6'>
            What genre defines your sound the best?
          </div>
          <input
            type='text'
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
            className={`${
              emptyFields.includes('genre') ? 'error' : ''
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900`}
          />
          <div onClick={handlePrevStep}>
            <svg
              className='absolute bottom-2 left-2 stroke-gray-400 hover:stroke-gray-50 transition-all hover:cursor-pointer'
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </div>

          <div onClick={handleNextStep}>
            <svg
              className='hover:scale-110 hover:translate-x-1 hover:cursor-pointer active:scale-95 transition-all stroke-gray-300 hover:stroke-white'
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M5 12h13M12 5l7 7-7 7' />
            </svg>
          </div>
        </div>

        <div
          className={`flex flex-col ${
            currentStep !== 3 ? 'hidden' : ''
          } justify-center items-center gap-6`}
          id='phaseLink'>
          <div className='md:text-2xl font-semibold mb-6'>Provide a link to your demo</div>
          <input
            type='text'
            onChange={(e) => setLink(e.target.value)}
            value={link}
            className={`${
              emptyFields.includes('link') ? 'error' : ''
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900`}
          />
          <div onClick={handlePrevStep}>
            <svg
              className='absolute bottom-2 left-2 stroke-gray-400 hover:stroke-gray-50 transition-all hover:cursor-pointer'
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </div>

          <div onClick={handleNextStep}>
            <svg
              className='hover:scale-110 hover:translate-x-1 hover:cursor-pointer active:scale-95 transition-all stroke-gray-300 hover:stroke-white'
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='3'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M5 12h13M12 5l7 7-7 7' />
            </svg>
          </div>
        </div>

        <div
          className={`flex flex-col ${
            currentStep !== 4 ? 'hidden' : ''
          } justify-center items-center gap-2 sm:gap-6`}
          id='phaseDesc'>
          <div className='md:text-2xl font-semibold mb-6'>How would you describe this idea?</div>
          <textarea
            
            onChange={(e) => setDesc(e.target.value)}
            value={desc}
            rows={5}
            className={`${
              emptyFields.includes('desc') ? 'error' : ''
            } bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900 resize-none row-auto`}
          />
          <div onClick={handlePrevStep}>
            <svg
              className='absolute bottom-2 left-2 stroke-gray-400 hover:stroke-gray-50 transition-all hover:cursor-pointer'
              xmlns='http://www.w3.org/2000/svg'
              width='25'
              height='25'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#ffffff'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'>
              <path d='M15 18l-6-6 6-6' />
            </svg>
          </div>
          <button className='relative inline-flex group'>
              <div className='absolute transition-all duration-500 opacity-70 -inset-px bg-gradient-to-r from-[#7338c6] via-[#1432b8] to-[#41a2c2] rounded-md blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200'></div>
              <span
                
                title='Upload your idea'
                className='relative inline-flex items-center justify-center px-8 py-4 text-sm font-semibold text-white transition-all duration-200 bg-gray-900 rounded-xl '
                role='button'>
                Upload your idea
              </span>
            </button>
        </div>
      </form>

      {/* Step Indicators */}
      <div className='flex justify-center mt-10'>
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-4 w-4 rounded-full mx-2 ${
              step <= currentStep ? 'bg-gray-200' : 'bg-gray-700'
            }`}></div>
        ))}
      </div>
      {error && <div className='text-red-500 my-3'>{error}</div>}
      
    </div>
  );
};

export default PostForm;
