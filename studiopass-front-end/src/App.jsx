import { useState, useContext } from "react";
import { Routes, Route, useNavigate } from "react-router";
import "./App.css";
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SIgnInForm/SignInForm";
import Schedule from "./components/Schedule/Schedule";
import Agenda from "./components/Agenda/Bookings";

function App() {
  const { user } = useContext(UserContext);
  console.log("user signed in", user);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<h1>Hello World</h1>} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/sign-in" element={<SignInForm />} />
      </Routes>
    </>
  );
}

export default App;
