import {
  BrowserRouter,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import Footer from "./Components/Footer/Footer";
import Header from "./Components/Header/Header";
import Admin from "./pages/Admin";
import AdminCourse from "./pages/AdminCourse";
import Course from "./pages/Course";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { AuthGuard } from "./Components/ProtectedRoute/AuthGuard";
import { AuthProvider } from "./context/auth-context";
import ProfilePage from "./pages/Profile";
import { AuthGuardAdmin } from "./Components/ProtectedRoute/AuthGuardAdmin";
import ErrorPage from "./pages/Error";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <div style={{paddingTop: "4em"}}>
          <Routes>
            <Route
              path="/profile/:uid"
              element={
                <AuthGuard>
                  <ProfilePage />
                </AuthGuard>
              }
            />
            <Route
              path="/"
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            ></Route>
            <Route
              path="/course/:slug"
              element={
                <AuthGuard>
                  <Course />
                </AuthGuard>
              }
            />
            <Route path="/admin">
              <Route path="/admin" element={
               <AuthGuardAdmin>
                <Admin />
              </AuthGuardAdmin>} 
              />
              <Route path="/admin/new" element={
              <AuthGuardAdmin>
                <AdminCourse />
              </AuthGuardAdmin>
              } />
              <Route path="/admin/edit/:slug" element={
              <AuthGuardAdmin>
                <AdminCourse />
              </AuthGuardAdmin>
              } />
              
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="error" element={<ErrorPage />}/> 
          </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
