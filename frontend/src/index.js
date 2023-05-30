import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/WorkoutContext';
import { AuthContextProvider } from './context/AuthContext';
import { PracticesContextProvider } from './context/PracticeContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
        <PracticesContextProvider>
          <App />
        </PracticesContextProvider>
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
