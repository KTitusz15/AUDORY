import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './functions.js';
import App from './App';
import { PostsContextProvider } from './context/PostContext';
import { AuthContextProvider } from './context/AuthContext';
import { LikesContextProvider } from './context/LikesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React>
    <AuthContextProvider>
      <PostsContextProvider>
        <App />
      </PostsContextProvider>
    </AuthContextProvider>
  </React>
);
