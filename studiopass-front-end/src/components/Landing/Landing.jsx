import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

const Landing = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <h1>Welcome to Flow Studio</h1>
      {user ? (
        <>
          <p>Always a pleasure, {user.username}.</p>
        </>
      ) : (
        <>
          <p>Strength. Flexibility. Rhythm. All in one studio.</p>
          <p>Your first class is on us. Let's get moving!</p>
        </>
      )}
    </>
  );
};

export default Landing;
