import { usePostsContext } from '../hooks/usePostsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'


const PostDetails = ({ post, user_id }) => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/posts/' + post._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_POST', payload: json})
    }
  }

  

  return (
    <div>
      <div className="static flex flex-col justify-center p-5 my-3 bg-black shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-70 border border-gray-700 text-white w-full self-center transition-transform duration-200 hover:scale-[1.01]">
      <div className="flex flex-row items-center justify-between">
        {/* Details */}
        <div className="flex flex-col justify-between gap-0.5 sm:gap-1 md:gap-1 lg:gap-2 xl:gap-6 items-start w-full h-full pl-2 pr-10">
          <p className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl">{post.title}</p>
          <p className="font-light text-sm sm:text-sm md:text-lg lg:text-xl xl:text-2xl">{post.userName}</p>
          <p className="font-extralight opacity-70 text-xs sm:text-sm md:text-sm lg:text-lg">{post.genre}</p>
          <p className="font-extralight opacity-70 text-xs sm:text-sm md:text-sm lg:text-lg">{post.desc}</p>

        </div>



      </div>
      {/* Interactions */}
      <div className="right-0 absolute p-5 flex flex-col justify-around items-center gap-4">
        {/* Comment */}
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>

        {/* Like */}
        <div className="flex flex-col items-center gap-1.5">
          <svg className='hover:fill-white transition-colors hover:cursor-pointer' xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          <p className="text-sm">0</p>
        </div>

        {/* Delete */}
        {user.name == post.userName && (
          <span className="material-symbols-outlined" onClick={handleClick}>delete</span>
        )}
        
        
        
      </div>
      {/* Button */}
      <a target='_blank' href={post.link} className="self-center inline-flex items-center justify-center p-0.5 mt-5 mb-2 me-2 overflow-hidden font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 transition-transform duration-200 hover:scale-105">
        <span className="hidden sm:block text-center relative text-xs sm:text-sm md:text-lg lg:text-xl px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Play on SoundCloud
        </span>
        <span className="sm:hidden text-center relative text-xs sm:text-sm md:text-lg lg:text-xl px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{"stopColor": "#a434eb"}} />
                <stop offset="100%" style={{"stopColor": "#34b1eb"}}/>
              </linearGradient>
            </defs>
            <path d="M7 17.939h-1v-8.068c.308-.231.639-.429 1-.566v8.634zm3 0h1v-9.224c-.229.265-.443.548-.621.857l-.379-.184v8.551zm-2 0h1v-8.848c-.508-.079-.623-.05-1-.01v8.858zm-4 0h1v-7.02c-.312.458-.555.971-.692 1.535l-.308-.182v5.667zm-3-5.25c-.606.547-1 1.354-1 2.268 0 .914.394 1.721 1 2.268v-4.536zm18.879-.671c-.204-2.837-2.404-5.079-5.117-5.079-1.022 0-1.964.328-2.762.877v10.123h9.089c1.607 0 2.911-1.393 2.911-3.106 0-2.233-2.168-3.772-4.121-2.815zm-16.879-.027c-.302-.024-.526-.03-1 .122v5.689c.446.143.636.138 1 .138v-5.949" fill="url(#gradient)" />
          </svg>
        </span>

      </a>
      <p>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</p>
    </div>
    
    </div>
    
  )
}

export default PostDetails