import { UserContext } from "../../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import * as sessionApi from "../../services/sessionService";
import styles from "./Schedule.module.css";

const Schedule = ({ handleAddBooking, errorMsg, setErrorMsg }) => {
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllSessions = async () => {
      const sessionsData = await sessionApi.index();
      setSessions(sessionsData);
      setErrorMsg("");
    };
    fetchAllSessions();
  }, [user]);

  if (!sessions) return <p>Loading...</p>;

  return (
    <>
      <main className={styles.container}>
        <h1>Class Schedule</h1>
        {errorMsg && errorMsg}
        <section>
          {sessions.map((session) => (
            <article key={session._id}>
              <header>
                <div>
                  <h2>{session.title}</h2>
                  <h3>
                    {session.weekday}, {session.month} {session.day} •{" "}
                    {session.startTime} - {session.endTime}
                  </h3>
                </div>
              </header>
              <div className={styles.studentActions}>
                <Link to={`/schedule/${session._id}`}>More Info</Link>
                {user &&
                  user.role === "student" &&
                  (session.bookings.length < session.capacity ? (
                    <button
                      onClick={() => handleAddBooking(session._id, user._id)}>
                      Book
                    </button>
                  ) : (
                    <button disabled>Full</button>
                  ))}
              </div>
              <div>
                <p>Instructor: {session.instructorName}</p>
                {user &&
                  (user.role === "instructor" || user.role === "owner") && (
                    <>
                      <p>
                        {session.bookings.length}/{session.capacity} registered.
                      </p>
                    </>
                  )}
                {/* {user && user.role === "owner" && (
                  <>
                    <p>status: {session.status}</p>
                  </>
                )} */}
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
};

export default Schedule;
