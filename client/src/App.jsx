import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import HistoricalData from './pages/HistoricalData';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import { useState } from 'react';
import CustomNavbar from './components/CustomNavbar';
import Logout from './components/Logout';
import RegisterAndLogout from './components/RegisterAndLogout'

function App() {
  const [isAuthorized, setIsAuthorized] = useState(null);

  return (
    <BrowserRouter>
      <CustomNavbar isAuthorized={isAuthorized} />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route
          path='/history'
          element={
            <ProtectedRoute
              isAuthorized={isAuthorized}
              setIsAuthorized={setIsAuthorized}
            >
              <HistoricalData />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        <Route path='/register' element={<RegisterAndLogout />} />
        <Route path='*' element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
