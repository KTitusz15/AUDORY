import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Publish from './pages/Publish';
import Feedback from './pages/Feedback';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Loading from './pages/Loading';


function App() {
  const { user } = useAuthContext();
  

  // Check if user is logged in and store in session storage
  useEffect(() => {
    sessionStorage.setItem('loggedIn', user ? 'true' : 'false');
  }, [user]);

  return (
    <div className="App font-['Poppins']">
      <BrowserRouter>
        <div className='pages'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route
              path='/feedback'
              element={user || sessionStorage.getItem('loggedIn') === 'true' ? <Feedback /> : <Navigate to='/login' />}
            />
            <Route
              path='/post/:post_id'
              element={user || sessionStorage.getItem('loggedIn') === 'true' ? <Post /> : <Navigate to='/login' />}
            />
            <Route
              path='/publish'
              element={user || sessionStorage.getItem('loggedIn') === 'true' ? <Publish /> : <Navigate to='/login' />}
            />
            <Route
              path='/post/user/:user_id/:name'
              element={user || sessionStorage.getItem('loggedIn') === 'true' ? <Profile /> : <Navigate to='/login' />}
            />
            <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to='/' />}
            />
            <Route
              path='/signup'
              element={!user ? <Signup /> : <Navigate to='/' />}
            />
            
            {/* Catch-all route for handling unknown URLs */}
            <Route path="/*" element={<Error />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
