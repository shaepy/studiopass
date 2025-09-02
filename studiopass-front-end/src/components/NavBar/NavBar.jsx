import { Link } from "react-router";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import styles from "./NavBar.module.css";

const NavBar = () => {
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <nav className={styles.container}>
      {user ? (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/agenda">My Agenda</Link>
          </li>
          <li>
            <Link to="/schedule">Class Schedule</Link>
          </li>
          {user.role === "owner" && (
            <li>
              <Link to="/admin/new-session">New Session</Link>
            </li>
          )}
          <li>
            <Link to="/" onClick={handleSignOut}>
              Sign Out
            </Link>
          </li>
        </ul>
      ) : (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About Us</Link>
          </li>
          <li>
            <Link to="/schedule">Class Schedule</Link>
          </li>
          <li>
            <Link to="/sign-up">Register as New Client</Link>
          </li>
          <li>
            <Link to="/sign-up?role=instructor">Register as Staff</Link>
          </li>
          <li>
            <Link to="/sign-in">Sign In</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
