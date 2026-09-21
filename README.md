# MyTeachingApp

A full-stack e-learning / course management platform with role-based access for **Admins**, **Teachers**, and **Students**. Built with a Spring Boot REST API backend and a React (Vite) frontend, supporting JWT auth and OAuth2 login (Google & GitHub).

## Features

- 🔐 **Authentication & Authorization** — JWT-based auth + OAuth2 social login (Google, GitHub)
- 👥 **Role-Based Access Control** — Admin, Teacher, and Student roles with route-level and method-level security
- 📚 **Course Management** — Teachers can create, update, and publish courses
- 📝 **Enrollment System** — Students can browse and enroll in courses
- ⚡ **Redis Caching** — Cache abstraction layer for improved performance
- 🎯 **Custom Exception Handling** — Global exception handler with domain-specific exceptions
- 🖥️ **React Frontend** — Protected routes, role-guarded pages, Axios-based API layer

## Tech Stack

**Backend**
- Java 24, Spring Boot 4
- Spring Data JPA (Hibernate), MySQL
- Spring Security + JWT (jjwt), OAuth2 Client
- Redis (caching)
- ModelMapper, Lombok
- Maven

**Frontend**
- React 19, Vite 7
- React Router DOM 7
- Axios

## Project Structure

## API Overview

| Resource     | Base Path       | Key Endpoints |
|--------------|------------------|----------------|
| Auth         | `/user`          | `POST /login`, `POST /singin` |
| Courses      | `/course`        | `GET /`, `GET /{id}`, `POST /teacher`, `PUT /teacher/{id}`, `PATCH /teacher/{id}/publish` |
| Enrollments  | `/enrollments`   | `POST /enroll`, `GET /my-course` |
| Teacher      | `/teacher`       | `GET /courses/{id}/students`, `PATCH /course/{id}/publish` |
| Admin        | `/admin`         | `PATCH /make-teacher/{userId}`, `PATCH /make-admin/{userId}` |

## Getting Started

### Prerequisites
- Java 24+, Maven
- Node.js 18+
- MySQL running locally
- Redis running locally

### Backend Setup

```bash
cd MyTeachingApp
```

Configure `src/main/resources/application.properties` with your own DB credentials, JWT secret, and OAuth2 client IDs/secrets (see **Configuration** below).

```bash
./mvnw spring-boot:run
```

Backend runs on `http://localhost:9090`.

### Frontend Setup

```bash
cd teaching-frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:5173`.



