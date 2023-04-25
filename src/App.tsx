import { IdTokenResult, onAuthStateChanged, User } from "firebase/auth";
import React, {
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  BrowserRouter,
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
import AuthChecker from "./Components/AuthChecker";
import { AuthGuard } from "./Components/ProtectedRoute/AuthGuard";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { AuthContext, AuthProvider } from "./context/auth-context";
import Signup from "./pages/SignUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <MakeAdmin /> */}
        <AuthProvider>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route
              path="/course/:slug"
              element={
                <AuthGuard>
                  <Course />
                </AuthGuard>
              }
            />
            <Route path="/admin">
              {/* Create adminprotected route */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/new" element={<AdminCourse />} />
              <Route path="/admin/edit/:slug" element={<AdminCourse />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" /> {/*Page not found*/}
          </Routes>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
