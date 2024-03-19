import React, { createContext, useReducer, useContext } from 'react';

export const LikesContext = createContext();

export const likesReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LIKES':
      return {
        ...state,
        likes: action.payload,
      };
    case 'CREATE_LIKE':
      return {
        ...state,
        likes: state.likes + 1,
        liked: true,
      };
    case 'DELETE_LIKE':
      return {
        ...state,
        likes: state.likes - 1,
        liked: false,
      };
    case 'SET_LIKED':
      return {
        ...state,
        liked: action.payload
      };
    default:
      return state;
  }
};

export const LikesContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(likesReducer, {
    likes: 0, // Initial number of likes
    liked: false
  });

  return (
    <LikesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </LikesContext.Provider>
  );
};
