import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Forgot from './pages/forgot/Forgot';
import ResetPassword from './pages/reset/Reset';
import Eartraining from './pages/eartraining/Eartraining';
import Landing from './pages/landing/Landing';
import Profile from './pages/profile/Profile';
// import Tuner from './pages/tuner/Tuner';

function App() {
  const { user } = useAuthContext()

  return (
      <div className="App">
        <BrowserRouter>
          <div className='pages'>
            <Routes>
              <Route
                path='/'
                element={user ? <Eartraining /> : <Navigate to="/landing" />}
                />
              <Route
                path='/profile'
                element={user ? <Profile /> : <Navigate to="/landing" />}
                />
              {/* <Route
                path='/tuner'
                element={user ? <Tuner /> : <Navigate to="/landing" />}
                /> */}
              <Route
                path='/landing'
                element={!user ? <Landing /> : <Navigate to="/" />}
                />
              <Route 
                path="/reset-password/:token"
                element={!user ? <ResetPassword /> : <Navigate to="/" />}
                />
              <Route
                path='/login'
                element={!user ? <Login /> : <Navigate to="/" />}
                />
              <Route
                path='/forgot'
                element={!user ? <Forgot /> : <Navigate to="/" />}
                />
              <Route
                path='/signup'
                element={!user ? <Signup /> : <Navigate to="/" />}
                />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
  );
}

export default App;
