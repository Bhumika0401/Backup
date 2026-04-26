// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";   // ✅ ADD THIS

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyPage from "./pages/SurveyPage";
import ProtectRoutes from "./components/ProtectRoutes";

/* Layout for pages WITH navbar */
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ❌ No Navbar */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ✅ WITH Navbar */}
        <Route 
          path="/home" 
          element={
            <ProtectRoutes>
              <Layout>
                <Home />
              </Layout>
            </ProtectRoutes>
          } 
        />

        <Route 
          path="/create-poll" 
          element={
            <Layout>
              <CreatePoll />
            </Layout>
          } 
        />

        <Route 
          path="/create-survey" 
          element={
            <Layout>
              <CreateSurvey />
            </Layout>
          } 
        />

        <Route 
          path="/survey/:id" 
          element={
            <Layout>
              <SurveyPage />
            </Layout>
          } 
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
