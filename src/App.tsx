import { LoadingButton } from "@mui/lab";
import { CircularProgress, LinearProgress } from "@mui/material";
import { onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { auth } from "./firebase";
import Admin from "./pages/Admin";
import Course from "./pages/Course";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/SignUp";

function App() {
  const [user, setUser] = useState<User>();

  React.useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
        } else {
          setUser(undefined);
        }
      }
    );

    return unSubscribeAuth;
  }, [user]);

  return (
    <div className="App">
      {user ? (
        <Router>
          <Header />
          {<p>HELLO, {user.displayName}</p>}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/course/:slug" element={<Course />} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <Login user={user} />
      )}
    </div>
  );
}

export default App;
