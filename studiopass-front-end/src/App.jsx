import { useState, useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SIgnInForm/SignInForm";
import Schedule from "./components/Schedule/Schedule";
import Agenda from "./components/Agenda/Agenda";
import Landing from "./components/Landing/Landing";
import Loading from "./components/Loading/Loading";
import ClassPage from "./components/ClassPage/ClassPage";
import NewSessionForm from "./components/NewSessionForm/NewSessionForm";

function App() {
  const { user } = useContext(UserContext);
  console.log("User signed in", user);

  return (
    <>
      <NavBar />
      <Routes>
        {/* Open routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/schedule/:sessionId" element={<ClassPage />} />
        <Route path="/agenda" element={<Agenda />} />

        {/* Owner-only routes */}
        {user && user.role === "owner" && (
          <Route path="/admin/new-session" element={<NewSessionForm />} />
        )}

        {!user && (
          <>
            <Route path="/sign-up" element={<SignUpForm />} />
            <Route path="/sign-in" element={<SignInForm />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
