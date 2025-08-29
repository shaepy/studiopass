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
        <h2>with {session.instructorName}</h2>
        <p>{session.description}</p>
        <button>Book</button>
      </main>
    </>
  );
};

export default ClassPage;
