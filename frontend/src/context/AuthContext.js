// In your AuthContext.js file
import React, { createContext, useReducer, useEffect, useCallback } from 'react';


export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    case 'SET_CREDITS':
      return { user: { ...state.user, credits: action.payload } }; // Merge new credits into existing user object
    default:
      return state;
  }
};


export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      dispatch({ type: 'LOGIN', payload: user });
    }
    
    const fetchUserCredits = async () => {
      if (user) {
        try {
          const response = await fetch(`https://audory-api.vercel.app/api/user/${user._id}/credits`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
          const json = await response.json();
          console.log(json);
          if (response.ok) {
            dispatch({ type: 'SET_CREDITS', payload: json.credits });
          } else {
            console.error('Failed to fetch user credits:', json.error);
          }
        } catch (error) {
          console.error('Error fetching user credits:', error);
        }
      }
    };

    fetchUserCredits();
  }, []);

  const memoizedDispatch = useCallback((action) => {
    dispatch(action);
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch: memoizedDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
