import { useState, useEffect, useContext } from "react";
import * as userApi from "../../services/userService";
import * as sessionApi from "../../services/sessionService";
import { UserContext } from "../../contexts/UserContext";

const NewSessionForm = () => {
  const { user } = useContext(UserContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startAtDate: "",
    startAtTime: "",
    endAtDate: "",
    endAtTime: "",
    capacity: 2,
    instructor: "shae",
  });
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchStaff = async () => {
      const staffData = await userApi.getStaff();
      setInstructors(staffData);
    };
    fetchStaff();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const newSession = await sessionApi.create();
    console.log("newSession created:", newSession);
  };

  return (
    <>
      <main>
        <h1>Create a New Session</h1>
        <form onSubmit={handleSubmit}>
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

export default NewSessionForm;
