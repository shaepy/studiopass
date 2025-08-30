import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import * as sessionApi from "../../services/sessionService";
import styles from "./ClassPage.module.css";

const ClassPage = ({ handleAddBooking }) => {
  const { user } = useContext(UserContext);
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await sessionApi.show(sessionId);
      console.log("sessionData:", sessionData);
      setSession(sessionData);
    };
    fetchSession();
  }, [sessionId]);

  if (!session) return <p>Loading...</p>;

  if (user && (user.role === "instructor" || user.role === "owner")) {
    return (
      <main className={styles.container}>
        <header>
          <h1>{session.title}</h1>
          <h2>
            {session.month} {session.day}, {session.year} • {session.startTime}{" "}
            - {session.endTime}
          </h2>
          <h2>with {session.instructorName}</h2>
        </header>
        <p>{session.description}</p>
        <p>
          Registered: {session.bookings.length}/{session.capacity}
        </p>
        {user.role === "owner" && (
          <>
            <Link to={`/schedule/${session._id}/edit`}>Edit</Link>
          </>
        )}
        <section>
          <h3>Reserved</h3>
          {session.bookings.map((booking) => (
            <ul key={booking._id}>
              <li>
                <Link to={`/users/${booking.userId._id}`}>
                  {booking.userId.firstName} {booking.userId.lastName}
                </Link>
              </li>
            </ul>
          ))}
        </section>
      </main>
    );
  } else {
    return (
      <main>
        <h1>{session.title}</h1>
        <h2>
          {session.month} {session.day}, {session.year} • {session.startTime} -{" "}
          {session.endTime}
        </h2>
        <h2>with {session.instructorName}</h2>
        <p>{session.description}</p>
        {user &&
          (session.reserved ? (
            <button disabled>Reserved</button>
          ) : session.bookings.length >= session.capacity ? (
            <button disabled>Full</button>
          ) : (
            <button onClick={() => handleAddBooking(session._id, user._id)}>
              Book
            </button>
          ))}
      </main>
    );
  }
};

export default ClassPage;
