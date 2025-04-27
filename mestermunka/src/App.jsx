import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import './App.css';
import Main from './components/Main/Main';
import Foglalas from './components/Foglalas/Foglalas.jsx';
import Profil from './components/Profil/Profil.jsx';
import Galeria from './components/Galeria/galeria.jsx';
import BookingPage from "./components/Foglalas/BookingPage";
import RegistrationLogin from "./components/Regisztracio/RegistrationLogin.jsx";
import UserContext from "./js/UserContext.js";

function App() {

  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [pathname]);

    return null;
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="/main" element={<Main />} />
          <Route path="/galeria" element={<Galeria />} />
          <Route path="/foglalas" element={
            user ? <Foglalas /> : <Navigate to="/regisztracio" replace />
          } />
          <Route path="/foglalas/:id" element={
            user ? <BookingPage /> : <Navigate to="/regisztracio" replace />
          } />
          <Route path="/profil" element={
            user ? <Profil /> : <Navigate to="/regisztracio" replace />
          } />
          <Route path="/regisztracio" element={<RegistrationLogin />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
