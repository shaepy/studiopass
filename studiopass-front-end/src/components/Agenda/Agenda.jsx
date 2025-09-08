import * as agendaApi from "../../services/agendaService";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Agenda.module.css";

const Agenda = ({ linkToClassPage }) => {
  const { user } = useContext(UserContext);
  const [agenda, setAgenda] = useState([]);

  const fetchAgendaIndex = async () => {
    const agendaData = await agendaApi.index();
    console.log("agendaData:", agendaData);
    setAgenda(agendaData);
  };

  useEffect(() => {
    if (user) fetchAgendaIndex();
  }, [user]);

  const handleCancelBooking = async (bookingId, user) => {
    const canceled = await agendaApi.cancelBooking(bookingId, user);
    console.log("handleCancelBooking API response:", canceled);
    // refresh agenda
    fetchAgendaIndex();
  };

  if (!agenda) return <p>Loading...</p>;

  if (agenda.length < 1) {
    return (
      <main className={styles.container}>
        <h1>Upcoming</h1>
        {user.role === "student" ? (
          <p>
            Go to our <Link to="/schedule">class schedule</Link> and book a
            class.
          </p>
        ) : (
          <p>You have no assigned classes.</p>
        )}
      </main>
    );
  }

  if (user.role === "student") {
    return (
      <main className={styles.container}>
        <header className={styles.agendaHeader}>
          <h1>Upcoming</h1>
          <p>Here’s your upcoming schedule.</p>
        </header>
        <section>
          {agenda.map((booking) => (
            <article
              className={`${styles.agendaArticle} ${styles.card}`}
              key={booking._id}>
              <header>
                <h2>{booking.sessionId.title}</h2>
              </header>
              <div>
                <p>
                  {booking.startDate} • {booking.startTime} - {booking.endTime}
                </p>
                <Link to={`/schedule/${booking.sessionId._id}`}>
                  View Class
                </Link>
              </div>
              <button onClick={() => handleCancelBooking(booking._id, user)}>
                Cancel
              </button>
            </article>
          ))}
        </section>
      </main>
    );
  } else {
    return (
      <main className={styles.container}>
        <h1>Upcoming</h1>
        <p>Here’s your upcoming schedule.</p>
        <section>
          {agenda.map((session) => (
            <article
              className={`${styles.agendaArticle} ${styles.card}`}
              key={session._id}>
              <header>
                <h2>{session.title}</h2>
              </header>
              <div>
                <p>
                  {session.startDate} • {session.startTime} - {session.endTime}
                </p>
                <p>
                  {session.bookings.length}/{session.capacity} registered.
                </p>
                <button onClick={() => linkToClassPage(session._id)}>
                  Manage Class
                </button>
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }
};

export default Agenda;
