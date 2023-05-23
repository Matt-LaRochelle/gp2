import { BrowserRouter, Route, Router, Routes, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
// pages & components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile'
import Theory from './pages/Theory'
import Eartraining from './pages/Eartraining'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={user ? <Home /> : <Navigate to="/login" />}
              />
              <Route
              path='/profile'
              element={user ? <Profile /> : <Navigate to="/login" />}
              />
              <Route
              path='/theory'
              element={user ? <Theory /> : <Navigate to="/login" />}
              />
              <Route
              path='/eartraining'
              element={user ? <Eartraining /> : <Navigate to="/login" />}
              />
              <Route
              path='/login'
              element={!user ? <Login /> : <Navigate to="/" />}
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
