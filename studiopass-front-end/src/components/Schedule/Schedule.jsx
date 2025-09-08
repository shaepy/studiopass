import { UserContext } from "../../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import * as sessionApi from "../../services/sessionService";
import styles from "./Schedule.module.css";
import BalletImage from "../../assets/img/ballet-jump.webp";

const Schedule = ({ handleAddBooking, linkToClassPage }) => {
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllSessions = async () => {
      const sessionsData = await sessionApi.index();
      setSessions(sessionsData);
    };
    fetchAllSessions();
  }, [user]);

  if (!sessions) return <p>Loading...</p>;

  if (sessions.length < 1) {
    return (
      <main className={styles.container}>
        <h1>Class Schedule</h1>
        <p>There are no classes available right now.</p>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <h1>Class Schedule</h1>
      <section>
        {sessions.map((session) => (
          <article
            key={session._id}
            className={`${styles.scheduleArticle} ${styles.card}`}>
            <header>
              <div>
                <h2>{session.title}</h2>
                <p>
                  {session.weekday}, {session.month} {session.day}
                </p>
                <p>
                  {session.startTime} - {session.endTime}
                </p>
              </div>
            </header>
            <div className={styles.studentActions}>
              <button onClick={() => linkToClassPage(session._id)}>
                View Class
              </button>
              {user &&
                user.role === "student" &&
                (session.reservedStatus ? (
                  <button disabled className={styles.disabledButton}>
                    Booked
                  </button>
                ) : session.bookings.length >= session.capacity ? (
                  <button disabled className={styles.disabledButton}>
                    Full
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddBooking(session._id, user._id)}>
                    Book
                  </button>
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
            </div>
          </article>
        ))}
      </section>
    </main>
  );
};

export default Schedule;
