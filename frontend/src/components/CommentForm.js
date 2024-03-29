import { useState } from "react"
import { useCommentsContext } from "../hooks/useCommentsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { usePostsContext } from "../hooks/usePostsContext"

const CommentForm = ({post_id}) => {
  const { dispatch } = useCommentsContext()
  const { user } = useAuthContext()

  const [comments, setComment] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const comment = { comments }
    const name = user.name
    const response = await fetch(`/api/comments/${post_id}`, {
      method: 'POST',
      body: JSON.stringify({comment, name}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      if (Array.isArray(json.emptyFields)) { // Check if emptyFields is an array
        setEmptyFields(json.emptyFields);
      } else {
        setEmptyFields([]); // Set emptyFields to an empty array if it's not an array
      }
    }
    if (response.ok) {
      setComment('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_COMMENT', payload: json })
    }
  }

  

  return (
    <div className="flex flex-col p-1 gap-2 border-gray-600 border md:mx-5 my-5 rounded-xl md:w-3/4 shadow-[0px_0px_10px_0px_#1e1b4b]">
      <form className="create" onSubmit={handleSubmit}>
        <div className="flex flex-row items-center p-3">
          <div>
            <textarea name="comment" id="comment" onChange={(e) => setComment(e.target.value)}
              value={comments} cols="150" rows="3" placeholder="Write down your thoughts" className={emptyFields.includes('comment') ? 'error' : 'resize-y bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900'}></textarea>
          </div>

          <div>
          <button className="active:scale-75 transition-all duration-100 hover:cursor-pointer hover:scale-110 pl-5 pr-2" >
          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 10l6-6 6 6"/><path d="M4 20h7a4 4 0 0 0 4-4V5"/></svg>
          
          </button>
          </div>

          
        </div>
        <div className='flex flex-col'>
          
          {error && <div className="error">{error}</div>}
        </div>
      </form>
      
    </div>
  )
}

export default CommentForm