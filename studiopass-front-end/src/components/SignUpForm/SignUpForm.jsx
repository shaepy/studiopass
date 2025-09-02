import { useState, useContext } from "react";
import { useNavigate, useSearchParams, Link } from "react-router";
import { signUp } from "../../services/authService";
import { UserContext } from "../../contexts/UserContext";
import styles from "./SignUpForm.module.css";

const SignUpForm = () => {
  const [searchParams] = useSearchParams();
  let role = searchParams.get("role");
  if (!role) role = "student";
  console.log(role);

  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    passwordConf: "",
    email: "",
    firstName: "",
    lastName: "",
  });

  const { username, password, passwordConf, email, firstName, lastName } =
    formData;

  const handleChange = (e) => {
    setMessage("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newUser = await signUp(formData, role);
      setUser(newUser);
      console.log("newUser is:", newUser);
      navigate("/");
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(
      username &&
      password &&
      email &&
      firstName &&
      lastName &&
      password === passwordConf
    );
  };

  return (
    <main className={styles.container}>
      <section className={styles.signUpForm}>
        <h1>Create an Account</h1>
        <form onSubmit={handleSubmit} className={styles.card}>
          <p>{message}</p>
          <div>
            <label htmlFor="confirm">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              name="email"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              name="username"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              name="firstName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="username">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              name="lastName"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              name="password"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password</label>
            <input
              type="password"
              id="confirm"
              value={passwordConf}
              name="passwordConf"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <button
              disabled={isFormInvalid()}
              className={isFormInvalid() ? styles.disabledButton : ""}>
              Sign Up
            </button>
            <button onClick={() => navigate("/")}>Cancel</button>
          </div>
        </form>
        <p>
          Already have an account? <Link to="/sign-in">Sign In here.</Link>
        </p>
      </section>
    </main>
  );
};

export default SignUpForm;
