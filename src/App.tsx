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


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <MakeAdmin /> */}
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
              {/* Create adminprotected route */}
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/new" element={<AdminCourse />} />
              <Route path="/admin/edit/:slug" element={<AdminCourse />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" /> {/*Page not found*/}
          </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
