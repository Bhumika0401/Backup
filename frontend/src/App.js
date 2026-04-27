// src/App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CreatePoll from "./pages/CreatePoll";
import CreateSurvey from "./pages/CreateSurvey";
import SurveyPage from "./pages/SurveyPage";
import ProtectRoutes from "./components/ProtectRoutes";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
         <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<ProtectRoutes>
      <Home />
    </ProtectRoutes>} />
        <Route path="/create-poll" element={ <ProtectRoutes>
      <CreatePoll />
    </ProtectRoutes>} />
        <Route path="/create-survey" element={<ProtectRoutes>
      <CreateSurvey />
    </ProtectRoutes>} />
        <Route path="/survey/:id" element={<SurveyPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;