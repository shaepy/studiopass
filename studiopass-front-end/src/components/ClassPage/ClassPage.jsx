import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { useParams, Link } from "react-router";
import * as sessionApi from "../../services/sessionService";

const ClassPage = () => {
  const { user } = useContext(UserContext);
  const { sessionId } = useParams();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await sessionApi.show(sessionId);
      console.log("sessionData returned from api:", sessionData);
      setSession(sessionData);
    };
    fetchSession();
  }, [sessionId]);

  if (!session) return <p>Loading...</p>;
  return (
    <>
      <main>
        <h1>{session.title}</h1>
        <h2>
          {session.month} {session.day}, {session.year} • {session.startTime} -{" "}
          {session.endTime}
        </h2>
        <h2>with {session.instructorName}</h2>
        <p>{session.description}</p>
        <button>Book</button>
        {user.role === "owner" && (
          <>
            <Link to={`/schedule/${session._id}/edit`}>Edit</Link>
          </>
        )}
      </main>
    </>
  );
};

export default ClassPage;
