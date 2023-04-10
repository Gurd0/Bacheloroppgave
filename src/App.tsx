import { IdTokenResult, onAuthStateChanged, User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import { auth } from "./firebase";
import Admin from "./pages/Admin";
import MakeAdmin from "./pages/Admin/addAdmin";
import AdminCourse from "./pages/AdminCourse";
import Course from "./pages/Course";
import Home from "./pages/Home";
import Login from "./pages/Login";
//import ProfilePage from "./pages/Profile";
import Signup from "./pages/SignUp";

function App() {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const unSubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          setUser(authenticatedUser);
          authenticatedUser.getIdToken(true).then((token) => setToken(token));
        } else {
          setUser(undefined);
          setToken("");
        }
      }
    );

    return unSubscribeAuth;
  }, [user]);

  function getToken() {
    console.log(user?.uid);
  }
  return (
    <div className="App">
      {user ? (
        <Router>
          {/* <MakeAdmin /> */}
          <Header />
          <h1>HELLO, {user?.displayName}</h1>
          <button onClick={getToken}> GET TOKEN APP</button>
          <Routes>
            <Route path="/" element={<Home user={user} />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/new" element={<AdminCourse />} />
            <Route path="/admin/edit/:slug" element={<AdminCourse />} />
            <Route path="/login" element={<Login user={user} />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/course/:slug" element={<Course user={user} />} />
          </Routes>
          <Footer />
        </Router>
      ) : (
        <Router>
          <Header />
          <Routes>
            <Route path="/login" element={<Login user={user} />} />
          </Routes>
          <Footer />
        </Router>
      )}
    </div>
  );
}

export default App;
