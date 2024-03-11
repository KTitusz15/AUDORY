import { useAuthContext } from './useAuthContext'
import { usePostsContext } from './usePostsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchPosts } = usePostsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchPosts({ type: 'SET_POSTS', payload: null })

    // change the path to "/"
    window.location.pathname = "/"
  }

  return { logout }
}