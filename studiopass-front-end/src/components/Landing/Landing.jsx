import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import styles from "./Landing.module.css";

const Landing = () => {
  const navigate = useNavigate();

  const linkToBookAClass = () => {
    navigate("/schedule");
  };

  const linkToRegister = () => {
    navigate("/sign-up");
  };

  const linkToAgenda = () => {
    navigate("/agenda");
  };

  const { user } = useContext(UserContext);
  return (
    <div
      style={{
        width: "100vw",
        height: "100%",
        zIndex: -1,
        backgroundImage: 'url("/src/assets/img/ballet-class.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <main style={{ position: "relative", zIndex: 1, paddingTop: "20px" }}>
        <header>
          <h1>Grand Academy of Ballet</h1>
        </header>
        <section>
          {user ? (
            <main>
              {" "}
              <section style={{ fontWeight: "600" }}>
                <p>Your training continues, {user.username}.</p>
                <p>Step back into the discipline and beauty of ballet.</p>
                {user.role === "student" && (
                  <button onClick={linkToBookAClass}>Book a Class</button>
                )}
                {(user.role === "instructor" || user.role === "owner") && (
                  <button onClick={linkToAgenda}>View Schedule</button>
                )}
              </section>
            </main>
          ) : (
            <main>
              {" "}
              <section style={{ fontWeight: "600" }} className={styles.homeContent}>
                <p>
                  The heart of our academy is rooted in the disciplines of
                  traditional ballet.
                </p>
                <p>
                  We serve children, teens, and adults while broadening movement
                  education through contemporary dance, flexibility training,
                  and Pilates/yoga.
                </p>
                <p>The stage begins with a single step.</p>
                <button onClick={linkToRegister}>Enroll Today</button>
              </section>
            </main>
          )}
        </section>
      </main>
    </div>
  );
};

export default Landing;
