# KEIVerse Website | Client

![KEIVerse Logo](./public/logo-background.png)

**Slogan:** Connecting minds. Expanding learning journeys!
**KEIVerse Client** is the user interface for an interactive education web platform. It allows students and teachers to manage classes, assignments, quizzes, and engage in real-time activities such as chat, surveys, and random selections in class.  
This project is the **frontend part of the SE122 course at UIT**, aimed at learning software engineering concepts by building a full-featured educational web application.  
KEIVerse simplifies classroom management, improves student engagement, and provides realtime feedback and analytics for both teachers and students.

---

## Demo

> 🌐 **Live Demo:** [Coming Soon]
> 🎬 **Screenshots / GIFs:** _(Update later)_

---

## Tech Stack

- **Frontend:** React 19 + TypeScript + Vite
- **UI Framework:** TailwindCSS v4, Shadcn/UI
- **Router Management:** React Router v7
- **State Management:** React Redux + Redux Toolkit
- **API Services**: Axios

---

## Features

- User authentication (register/login with role selection & OAuth2)
- Class management (create, join, manage members)
- Assignment management (create, submit, review, grade)
- Quiz management (online/offline quiz creation, participation, real-time scoring)
- Chat & forum for student-teacher communication
- Surveys for collecting opinions
- Notifications and highlighting important tasks
- Random selection tool for students, groups, or ideas
- Dashboard showing progress and pending tasks

---

## Installation & Run

### 1. Clone project

```bash
git clone https://github.com/Akuma-W/keiverse-client.git
cd kei-verse-client
```

### 2. Environment variables

Create a `.env` file in `front-end` folder and set variables like:

```bash
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
```

### 3. Run backend server

Make sure to run the backend first at: `http://localhost:5000/`

### 4. Run Frontend

```bash
cd kei-verse-client
npm install
npm run dev
```

> Runs at: `http://localhost:5173/` (or port displayed in terminal)

---

## Folder Structure

```bash
📦 kei-verse-client
┣ 📂 public              # Static assets
┣ 📂 src
┃ ┣ 📂 assets           # Images, fonts, and media files
┃ ┣ 📂 components       # Reusable React components
┃ ┃ ┗ 📂 ui            # Shadcn/UI components
┃ ┣ 📂 config           # Configuration files
┃ ┣ 📂 features         # Redux slices & feature logic
┃ ┣ 📂 hooks            # Custom React hooks
┃ ┣ 📂 layouts          # Layout components for pages
┃ ┣ 📂 lib              # Shadcn/UI utilities
┃ ┣ 📂 pages            # Page components
┃ ┣ 📂 routes           # Route definitions
┃ ┣ 📂 services         # Axios API services
┃ ┣ 📂 store            # Redux store configuration
┃ ┣ 📂 styles           # Global TailwindCSS styles
┃ ┣ 📂 types            # TypeScript type definitions
┃ ┣ 📄 App.tsx          # Main App component
┃ ┣ 📄 main.tsx         # Application entry point
┃ ┗ 📄 style.css        # Global TailwindCSS configuration
```

---

## License & Contact

- **License:** MIT License – free to use, modify, and distribute with attribution.
- **Author:** Tran Tuan Phong (22521094 - UIT)
- **Email:** [tuanphongbrvt1@gmail.com](mailto:tuanphongbrvt1@gmail.com)
- **Linkedln**: [Phong Tran Tuan](https://www.linkedin.com/in/phongakuma/)

> ⚡ Notes: Screenshots/GIFs and Live Demo link will be updated soon.
