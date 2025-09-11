# StudioPass

#### Deployment Link: https://studiopass.netlify.app/

StudioPass is a full-stack MERN (MongoDB, Express, React, Node.js) application for managing studio classes and bookings with robust role-based access.

<img width="650" alt="unauth-user-home" src="https://github.com/user-attachments/assets/2a1b2326-2c4b-4383-a6dd-867aa64e7ddc" />

This demo is styled for a ballet studio, but the system is flexible and can be adapted for any type of studio or class-based business. Use the login credentials below for existing instructor/owner accounts.

| Account Role | Username | Password |
|--------------|----------|----------|
| Instructor   | jojo     | secret   |
| Owner        | sarah     | secret   |

## Overview
With a background as a fitness and dance instructor, I have worked with many studios and small businesses that rely on booking systems to manage classes, instructors, and students. I chose to build StudioPass to explore how these systems function from the ground up and to challenge myself to design one from scratch. The project also serves as inspiration for creating booking platforms for studio owners I know in my community.

<img width="650" alt="student-schedule" src="https://github.com/user-attachments/assets/7cf47705-c543-479e-97b6-aef8cb7a386d" />

##  Features

<img width="650" alt="owner-class-page" src="https://github.com/user-attachments/assets/645cf7dc-8545-4c8b-98ec-4d46ab60d976" />

- **Role-Based Access Control**  
  - **Owners** can create and manage studios, instructors, and class schedules.  
  - **Instructors** can view their classes, manage sessions, and track student enrollment.  
  - **Students** can browse class offerings, book sessions, and view their upcoming schedule.

- **Class Scheduling & Booking Flow**  
  Enables studio owners to create and update class schedules. Students can explore classes, book or cancel sessions, and view availability in real-time.

- **Instructor & Studio Management**  
  Owners can assign instructors to classes, update current class details and capacity, as well as creating or deleting (cancelling) classes.
  Instructors can view how many students are registered for class and access their profiles for contact information.

- **User Authentication & Authorization**  
Secure sign-up and login flows using JWT tokens and payloads for authentication.
Tokens are stored and verified on each request through middleware, ensuring only authorized users can access protected routes.
Role-based checks provide differentiated access and views for owners, instructors, and students.

- **Responsive Front-End Experience**  
  Built with React, the UI adapts gracefully to mobile and desktop views for seamless booking and management.

<img width="650" alt="student-agenda" src="https://github.com/user-attachments/assets/b1257a61-798b-49a3-87d7-cc780a9eb75d" />


##  Technology Stack

| Layer               | Technologies              |
|--------------------|---------------------------|
| **Front-End**      | React, Context API, CSS (styled-components) |
| **Back-End API**   | Node.js, Express           |
| **Database**       | MongoDB                    |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **Hosting / Deployment** | Heroku |
| **External Tools** | Mongoose, Axios |

#### Live Repositories:
- [StudioPass Front-End](https://github.com/shaepy/studiopass-front-end)
- [StudioPass Back-End](https://github.com/shaepy/studiopass-back-end)

---

## Planning Phase
- [Link to Full Project Plan](https://www.notion.so/Unit-3-StudioPass-2567ed1fdd5880b7b438ecdae23f3b84?source=copy_link)
- [Kanban Board](https://www.notion.so/25b7ed1fdd5880a4905dc7b6d1b773f0?v=25b7ed1fdd58817893f4000cccfa1021&source=copy_link)

### Entity Relationship Diagram (ERD)
- Accounts with an "owner" or "instructor" role cannot register for classes
- Student-role accounts cannot manage classes or view registered users
  
<img width="750" alt="studio-app-ERD" src="https://github.com/user-attachments/assets/3c017c4d-81c3-446f-8a20-5011fe8a57a4" />

#### Database Design
I designed this ERD to capture the relationships between users, sessions, and bookings in a way that reflects how studios actually operate. 
- The `User` model distinguishes between owners, instructors, and students through a role field, while still sharing core information like login credentials and profiles. 
- The `Session` model represents individual classes with details such as instructor, capacity, and schedule. 
- The `Booking` model acts as a connector, linking students to specific sessions while also storing status information like active or canceled. 
This structure keeps data normalized, avoids duplication, and makes it easier to manage role-based access and booking logic throughout the app.

I used references to keep data clean and connected without duplication. 
The `User` model tracks a student’s bookings and an instructor’s sessions, while the `Session` model links back to its instructor and enrolled bookings. 
The `Booking` model connects both the user and session, making it the bridge between who attends and what class they attend.

For example, when a student books a class:
- A new `Booking` is created that references both the userId and sessionId.
- The booking is added to the student’s bookings array and the session’s bookings array.
- The session’s capacity is checked and updated, keeping data consistent across all three models.

---

## Key Learnings

<img width="298" height="405" alt="studiopass-api" src="https://github.com/user-attachments/assets/b22c2ad8-b6db-49c4-8140-d541f7f686cb" />

### API Testing with Postman
A major takeaway from this project was realizing how valuable it is to shape API responses during backend development.
- Using Postman allowed me to test and refine endpoints before the frontend was built, which made it clear when data needed to be reformatted or enriched.
- As I built out the React frontend, I often noticed that the raw data coming from the backend needed to be reformatted before it could be displayed properly. 
- Instead of relying on the frontend to handle conversions, I updated the backend to send data in the exact structure needed, allowing it to handle all data preparation and maintain consistency.
This not only kept the React frontend simple and focused on rendering, but also reinforced the importance of designing clean, reliable APIs that serve the client effectively.

## Challenges
**Complex Role Management:** 
- Needing to support three distinct roles (owner, instructor, student) with different permissions.
- This required designing separate data flows and ensuring authorization checks were consistently enforced across the backend and frontend without overcomplicating relationships.
- Implementing secure authentication and authorization so each role only sees the correct features and permissions.

**State Management on the Frontend:** 
- Keeping the booking state, session availability, and role-specific dashboards synchronized in React while minimizing redundant API calls.
- Coordinating the booking logic from the backend (preventing overbookings, handling cancellations, and updating session availability in real-time).

## Wins
**Implemented Secure Role-Based Access:**
Designed middleware that validates JWT tokens and checks role permissions, ensuring owners, instructors, and students only access their respective routes.

**Dynamic Instructor Management:**
Developed an API endpoint specifically for owners to reassign instructors properly, updating references across user and session models without data loss.

**Streamlined Frontend Views:**
Created role-specific dashboards in React that display tailored information (e.g., upcoming classes for students, teaching schedule for instructors, studio overview for owners).

---

## Future Enhancements

These are potential next steps to improve the app:
- Email notifications for class reminders or schedule changes
- Calendar integration (Google Calendar, iCal, etc.)
- Payment integration for paid bookings
- Analytics dashboard for studio owners (attendance, bookings trends)
