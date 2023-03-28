import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './Components/Footer/Footer';
import Header from './Components/Header/Header';
import Admin from './pages/Admin';
import Course from './pages/Course';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/SignUp';
import AdminCourse from './pages/AdminCourse'

function App() {
  return (
    <div className="App">
      <Router>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path='/admin/new' element={<AdminCourse />} />
          <Route path='/admin/edit/:slug' element={<AdminCourse />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/course/:slug" element={<Course />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
