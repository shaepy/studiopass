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
import SessionForm from "./components/SessionForm/SessionForm";
import * as sessionApi from "./services/sessionService";

function App() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  console.log("User signed in", user);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddBooking = async (sessionId, userId) => {
    console.log("Book was clicked. Let's create a booking.");
    const res = await sessionApi.createBooking(sessionId, userId);
    console.log("api response returned", res);
    if (res.status === 403) {
      return setErrorMsg(res.data.error);
    }
    navigate("/agenda");
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
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
            />
          }
        />
        <Route
          path="/schedule/:sessionId"
          element={<ClassPage handleAddBooking={handleAddBooking} />}
        />
        <Route path="/agenda" element={<Agenda />} />

        {/* Admin-only routes (Instructor & Owner) */}
        {user && (user.role === "owner" || user.role === "instructor") && (
          <>
            <Route
              path="/users/:userId"
              element={<p>User page under construction</p>}
            />
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
