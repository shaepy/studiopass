import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import * as sessionApi from "../../services/sessionService";
import adminStyles from "./ClassPageAdmin.module.css";
import studentStyles from "./ClassPageStudent.module.css";

const ClassPage = ({ handleAddBooking, handleDeleteSession }) => {
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

  if (!session)
    return (
      <main className={adminStyles.container}>
        <p>Loading...</p>
      </main>
    );

  if (user && (user.role === "instructor" || user.role === "owner")) {
    return (
      <main className={adminStyles.container}>
        <header>
          <div>
            <h1 className={adminStyles.nonCursive}>{session.title}</h1>
            <h2>
              {session.month} {session.day}, {session.year} •{" "}
              {session.startTime} - {session.endTime}
            </h2>
          </div>
          <h2>with {session.instructorName}</h2>
        </header>
        <section>
          <p className={adminStyles.description}>{session.description}</p>
          {user.role === "owner" && (
            <div className={adminStyles.manageClass}>
              <h3>Manage Class</h3>
              <Link to={`/schedule/${session._id}/edit`}>Edit Class</Link>
              <button onClick={() => handleDeleteSession(session._id)}>
                Delete
              </button>
            </div>
          )}
        </section>
        <section>
          {session.bookings.length > 0 ? (
            <h3>
              Reserved {session.bookings.length}/{session.capacity}
            </h3>
          ) : (
            <p>
              <strong>No reservations yet.</strong>
            </p>
          )}
          {session.bookings.map((booking) => (
            <ul key={booking._id}>
              <li className={adminStyles.reservedList}>
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
      <main className={studentStyles.container}>
        <h1 className={adminStyles.nonCursive}>{session.title}</h1>
        <h2>
          {session.month} {session.day}, {session.year} • {session.startTime} -{" "}
          {session.endTime}
        </h2>
        <h2>with {session.instructorName}</h2>
        <p className={studentStyles.description}>{session.description}</p>
        {user &&
          (session.reservedStatus ? (
            <button disabled className={studentStyles.disabledButton}>
              Reserved
            </button>
          ) : session.bookings.length >= session.capacity ? (
            <button disabled className={studentStyles.disabledButton}>
              Full
            </button>
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
