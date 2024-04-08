import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Register from './pages/Register.jsx';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './context/AuthProvider.jsx';
import Login from './pages/LoginPage.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>

        <Routes>

          <Route
            path="/signup"
            element={<Register />}
          />

          <Route
            path="/signin"
            element={<Login />} />


          <Route
            exact path='/'
            element={<App />}
          />

        </Routes>
      </AuthProvider>

    </BrowserRouter>

  </React.StrictMode>
)