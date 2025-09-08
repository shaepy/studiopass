import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import * as userApi from "../../services/userService";
import * as sessionApi from "../../services/sessionService";
import styles from "./SessionForm.module.css";

const initialState = {
  title: "",
  description: "",
  startAtDate: "",
  startAtTime: "",
  endAtDate: "",
  endAtTime: "",
  capacity: 2,
  instructor: "default",
};

const SessionForm = () => {
  const navigate = useNavigate();
  const { sessionId } = useParams(); // if sessionId is undefined, not an edit route.
  const [formData, setFormData] = useState(initialState);
  const [instructors, setInstructors] = useState([]);

  //fetch session
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await sessionApi.show(sessionId);
      console.log("sessionData returned from api:", sessionData);
      setFormData(sessionData);
    };
    if (sessionId) fetchSession();
    return () => setFormData(initialState);
  }, [sessionId]);

  useEffect(() => {
    const fetchStaff = async () => {
      const staffData = await userApi.getStaff();
      setInstructors(staffData);
    };
    fetchStaff();
  }, []);

  if (instructors) {
    const list = instructors.map((i) => i.username);
    if (list.length < 1) return;
    initialState.instructor = list[0];
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (sessionId) {
      const updatedSession = await sessionApi.update(sessionId, formData);
      console.log("updatedSession is:", updatedSession);
      navigate(`/schedule/${sessionId}`);
    } else {
      const newSession = await sessionApi.create(formData);
      console.log("newSession created:", newSession);
      navigate(`/schedule/${newSession._id}`);
    }
  };

  return (
    <>
      <main className={styles.container}>
        <h1>{sessionId ? "Edit Session" : "Add New Class"}</h1>
        <form onSubmit={handleSubmit} className={styles.card}>
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Class Title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Description</label>
            <textarea
              type="text"
              name="description"
              id="description"
              placeholder="Write a description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Capacity</label>
            <input
              type="number"
              name="capacity"
              id="capacity"
              value={formData.capacity}
              onChange={handleChange}
              required
            />
          </div>
          {!sessionId && (
            <>
              <div>
                <label>Instructor</label>
                <select
                  name="instructor"
                  id="instructor"
                  value={formData.instructor}
                  onChange={handleChange}
                  required>
                  {instructors.map((i) => (
                    <option key={i.username}>{i.username}</option>
                  ))}
                </select>
              </div>
            </>
          )}
          <div>
            <label>Start Date</label>
            <input
              type="date"
              name="startAtDate"
              id="startAtDate"
              value={formData.startAtDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Start Time</label>
            <input
              type="time"
              name="startAtTime"
              id="startAtTime"
              value={formData.startAtTime}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>End Date</label>
            <input
              type="date"
              name="endAtDate"
              id="endAtDate"
              value={formData.endAtDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>End Time</label>
            <input
              type="time"
              name="endAtTime"
              id="endAtTime"
              value={formData.endAtTime}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </main>
    </>
  );
};

export default SessionForm;
