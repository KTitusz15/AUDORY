import { useState } from "react"
import { usePostsContext } from "../hooks/usePostsContext"
import { useAuthContext } from '../hooks/useAuthContext'

const PostForm = () => {
  const { dispatch } = usePostsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [genre, setGenre] = useState('')
  const [link, setLink] = useState('')
  const [desc, setDesc] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const post = { title, genre, link, desc }

    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(post),
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
      setTitle('')
      setGenre('')
      setLink('')
      setDesc('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_POST', payload: json })
    }
  }

  return (
    <div className="mx-auto p-5 mt-3 mb-20 bg-gray-300 shadow-[0px_0px_10px_0px_#1e1b4b] rounded-xl bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-10 border border-gray-700 text-white w-11/12 self-center">
      <form className="create" onSubmit={handleSubmit}>
        <div className="text-3xl mb-5">Create a New Sumbission</div>
        <div className="grid gap-6 mb-6 md:grid-cols-2 p-3">
          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Submission Title:</label>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              className={emptyFields.includes('title') ? 'error' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900'}
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Genre:</label>
            <input
              type="text"
              onChange={(e) => setGenre(e.target.value)}
              value={genre}
              className={emptyFields.includes('genre') ? 'error' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900'}
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">SoundCloud link:</label>
            <input
              type="text"
              onChange={(e) => setLink(e.target.value)}
              value={link}
              className={emptyFields.includes('link') ? 'error' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900'}
            />
          </div>

          <div>
            <label className="block mb-2 text-lg font-medium text-gray-900 dark:text-white">Description:</label>
            <input
              type="text"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              className={emptyFields.includes('desc') ? 'error' : 'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-900 focus:border-indigo-900 block w-full p-2.5 dark:bg-gray-900 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-900 dark:focus:border-indigo-900'}
            />
          </div>
        </div>
        <div className='flex flex-col'>
          <button className="self-center relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-indigo-900 group-hover:from-purple-600 group-hover:to-indigo-900 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800" >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Submit
            </span>
          </button>
          {error && <div className="error">{error}</div>}
        </div>
      </form>
    </div>
  )
}

export default PostForm