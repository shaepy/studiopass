import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as userApi from "../../services/userService";
import styles from "./UserProfile.module.css";

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState({});
  console.log("userId:", userId);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await userApi.getUser(userId);
      console.log("userData:", userData);
      setUser(userData);
    };
    fetchUser();
  }, [userId]);

  if (!user) {
    return <p>User not found.</p>;
  }

  return (
    <main className={styles.userProfileMain}>
      <header>
        <h1>
          {user.firstName} {user.lastName}
        </h1>
      </header>
      <div>
        <h2>Account</h2>
        <p>Username: {user.username}</p>
      </div>
      <div>
        <h2>Profile</h2>
        <p>
          Name: {user.firstName} {user.lastName}
        </p>
        <p>Email: {user.email}</p>
      </div>
      <section>
        <h2>Upcoming</h2>
        {user.bookings &&
          user.bookings.map(
            (booking) =>
              booking.status === "active" &&
              booking.sessionId.status === "scheduled" && (
                <>
                  <article key={booking._id} className={styles.card}>
                    <header>
                      <h4>{booking.sessionId.title}</h4>
                      <p>Date/Time {booking.sessionId.startAt}</p>
                    </header>
                  </article>
                </>
              )
          )}
      </section>
    </main>
  );
};

export default UserProfile;
