import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Components/Header/Header';
import Admin from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import Course from './pages/Course'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course/:slug" element={<Course />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
