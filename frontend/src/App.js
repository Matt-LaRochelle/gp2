import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Login from './pages/Login';
import Signup from './pages/Signup';
import Forgot from './pages/Forgot';
import ResetPassword from './pages/Reset';
import Eartraining from './pages/Eartraining'
import Landing from './pages/landing/Landing';

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={user ? <Eartraining /> : <Navigate to="/login" />}
              />
            <Route
              path='/landing'
              element={!user ? <Landing /> : <Navigate to="/" />}
              />
            <Route 
              path="/reset-password/:token"
              element={!user ? <ResetPassword /> : <Navigate to="/" />}
              />
              {/* <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to="/login" />}
              /> */}
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
