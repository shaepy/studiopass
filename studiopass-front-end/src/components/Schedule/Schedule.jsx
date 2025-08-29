import { UserContext } from "../../contexts/UserContext";
import { useState, useContext, useEffect } from "react";
import { Link } from "react-router";
import * as sessionApi from "../../services/sessionService";

const Schedule = () => {
  const [sessions, setSessions] = useState([]);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchAllSessions = async () => {
      const sessionsData = await sessionApi.index();
      setSessions(sessionsData);
    };
    fetchAllSessions();
  }, [sessions, user]);

  if (!sessions) return <p>Loading...</p>;

  return (
    <>
      <main>
        <h1>Class Schedule</h1>
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
              <div>
                <Link to={`/schedule/${session._id}`}>More Info</Link>
                <button>Book</button>
              </div>
            </header>
            <div>
              <p>Instructor: {session.instructorName}</p>
            </div>
          </article>
        ))}
      </main>
    </>
  );
};

export default Schedule;
