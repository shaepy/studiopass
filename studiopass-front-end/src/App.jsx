import {  useContext } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { UserContext } from "./contexts/UserContext";
import NavBar from "./components/NavBar/NavBar";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import SignInForm from "./components/SIgnInForm/SignInForm";
import Schedule from "./components/Schedule/Schedule";
import Agenda from "./components/Agenda/Agenda";
import Landing from "./components/Landing/Landing";
import ClassPage from "./components/ClassPage/ClassPage";
import SessionForm from "./components/SessionForm/SessionForm";
import UserProfile from "./components/UserProfile/UserProfile";
import About from "./components/About/About";
import * as sessionApi from "./services/sessionService";
import "./App.css";

function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleAddBooking = async (sessionId, userId) => {
    const newBooking = await sessionApi.createBooking(sessionId, userId);
    console.log("handleAddBooking API response:", newBooking);
    if (newBooking.status === 403) {
      return setErrorMsg(newBooking.data.error); // eventually will not need
    }
    navigate("/agenda");
  };

  const handleDeleteSession = async (sessionId) => {
    console.log("handleDeleteSession called:");
    const sessionMod = await sessionApi.deleteSession(sessionId);
    console.log("sessionModified:", sessionMod);
    navigate("/schedule");
  };

  const linkToClassPage = (sessionId) => {
    navigate(`/schedule/${sessionId}`);
  };

  return (
    <>
      <NavBar />
      <Routes>
        {/* All-roles routes */}
        <Route path="/" element={<Landing />} />
        <Route
          path="/schedule"
          element={
            <Schedule
              handleAddBooking={handleAddBooking}
              linkToClassPage={linkToClassPage}
            />
          }
        />
        <Route
          path="/schedule/:sessionId"
          element={
            <ClassPage
              handleAddBooking={handleAddBooking}
              handleDeleteSession={handleDeleteSession}
            />
          }
        />
        <Route
          path="/agenda"
          element={<Agenda linkToClassPage={linkToClassPage} />}
        />
        <Route path="/about" element={<About />} />

        {/* Admin-only routes (Instructor & Owner) */}
        {user && (user.role === "owner" || user.role === "instructor") && (
          <>
            <Route path="/users/:userId" element={<UserProfile />} />
          </>
        )}

        {/* Owner-only routes */}
        {user && user.role === "owner" && (
          <>
            <Route path="/admin/new-session" element={<SessionForm />} />
            <Route path="/schedule/:sessionId/edit" element={<SessionForm />} />
          </>
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
