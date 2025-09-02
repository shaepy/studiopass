import styles from "./About.module.css";
import BalletPhoto from "../../assets/img/ballet-group.jpg";

const About = () => {
  return (
    <main className={styles.container}>
      <section>
        <h1>About Us</h1>
        <img
          src={BalletPhoto}
          style={{ maxWidth: "98%", alignSelf: "center" }}
        />
        <div className={styles.aboutUsParagraph}>
          <p style={{ margin: "0 10px 10px 10px" }}>
            Founded over <strong>15 years ago</strong>, the{" "}
            <strong>Grand Academy of Ballet</strong> has become a cornerstone of
            classical dance training in our community. Established with the
            vision of bringing world-class ballet education to students of all
            ages, the academy blends the{" "}
            <strong>discipline of traditional Russian technique</strong> with
            contemporary approaches to movement and artistry.
          </p>
          <p style={{ margin: "0 10px 10px 10px" }}>
            Over the years, we have been honored to host and collaborate with
            distinguished instructors and guest artists from around the globe.
            Among them are <strong>Sergei Antonov</strong>, former soloist of
            the Swedish Ballet House, <strong>Elena Volkova</strong>, acclaimed
            pedagogue from the Bolshoi Ballet Academy, and{" "}
            <strong>Isabelle Laurent</strong>, international performer and coach
            from the Paris Opéra Ballet. Their influence and mentorship have
            shaped the academy’s curriculum, ensuring that each student receives
            training rooted in excellence and authenticity.
          </p>
          <p style={{ margin: "0 10px 10px 10px" }}>
            Our academy serves children, teens, and adults, offering programs
            that span from foundational ballet to pre-professional training. In
            addition to ballet, we provide contemporary dance, flexibility
            conditioning, Pilates, and yoga, recognizing the importance of a
            holistic approach to developing dancers who are not only technically
            proficient but also physically balanced and artistically expressive.
          </p>
        </div>
      </section>
      <section>
        <h2>Why We Dance</h2>
        <div className={styles.aboutUsParagraph}>
          <p style={{ margin: "0 10px 10px 10px" }}>
            At the <strong>Grand Academy of Ballet</strong>, we believe that
            dance is more than movement — it is expression, discipline, and
            connection. We dance to honor tradition, to tell stories without
            words, and to discover strength and grace within ourselves. For
            some, dance is a lifelong profession; for others, it is a journey of
            personal growth. Whatever the path, we dance because it unites body,
            mind, and spirit in the pursuit of artistry.
          </p>
          <p style={{ marginBottom: "40px" }}>
            Today, the <strong>Grand Academy of Ballet</strong> continues to
            uphold its reputation as a premier institution, fostering both
            aspiring professionals and those who simply wish to experience the
            joy and discipline of dance. Our mission is simple yet enduring: to
            cultivate strength, grace, and artistry in every dancer who walks
            through our doors.
          </p>
        </div>
      </section>
    </main>
  );
};

export default About;
