import * as agendaApi from "../../services/agendaService";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router";
import { UserContext } from "../../contexts/UserContext";
import styles from "./Agenda.module.css";

const Agenda = () => {
  const { user } = useContext(UserContext);
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    const fetchAgendaIndex = async () => {
      const agendaData = await agendaApi.index();
      console.log("agendaData:", agendaData);
      setAgenda(agendaData);
    };
    if (user) fetchAgendaIndex();
  }, [user]);

  if (!agenda) return <p>Loading...</p>;

  if (user.role === "student") {
    return (
      <main className={styles.container}>
        <h1>Upcoming</h1>
        <p>Here are your current reservations.</p>
        <section>
          {agenda.map((item) => (
            <article key={item._id}>
              <header>
                <h2>{item.sessionId.title}</h2>
              </header>
              <div>
                <p>
                  {item.startDate} • {item.startTime} - {item.endTime}
                </p>
                <Link to={`/schedule/${item.sessionId._id}`}>View Class</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  } else {
    return (
      <main className={styles.container}>
        <h1>Upcoming</h1>
        <section>
          {agenda.map((item) => (
            <article key={item._id}>
              <header>
                <h2>{item.title}</h2>
              </header>
              <div>
                <p>
                  {item.startDate}• {item.startTime} - {item.endTime}
                </p>
                <p>{item.bookings.length}/{item.capacity} registered.</p>
                <Link to={`/schedule/${item._id}`}>View Class</Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    );
  }
};

export default Agenda;
