import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { WeatherProvider } from './contexts/WeatherContext';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ChemicalDetailsPage from './pages/ChemicalDetailsPage';
import Login from './components/Login';
import Register from './components/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        <WeatherProvider>
          <div className="App">
            <Navigation />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/chemical/:id" element={<ChemicalDetailsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </WeatherProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
