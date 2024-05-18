# CouseGo API

This repository contains a Node.js API for managing student and course data. It's designed to be a robust and scalable backend for educational platforms, learning management systems, or other applications that require handling student and course information.

## Features

- **Student Management:**
    - Create, read, update, and delete student profiles.
    - Manage student details (name, email, enrollment date, etc.).
    - Assign students to courses.
- **Course Management:**
    - Create, read, update, and delete courses.
    - Manage course details (name, description, instructor, schedule, etc.).
    - Enroll students in courses.
- **Authentication:**
    - Secure user authentication for different roles (admin, instructor, student).
- **Data Validation:**
    - Input validation to ensure data integrity and prevent errors.
- **Error Handling:**
    - Robust error handling and logging for improved debugging and stability.

## Technologies Used

- **Node.js:** JavaScript runtime environment for building server-side applications.
- **Express.js:** Web application framework for Node.js, providing routing, middleware, and other features.
- **MongoDB:** NoSQL database for storing and managing data.
- **Mongoose:** Object Data Modeling (ODM) library for interacting with MongoDB.
- **JWT (JSON Web Token):** Used for user authentication and authorization.
- **Bcrypt:** Library for secure password hashing.
- **Other Libraries:** Various libraries and packages for specific functionalities, such as email sending, file uploads, and data validation.

## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:
- `PORT` - Defines the port on which the API will listen.
- `MONGO_URL` - The URL for the database connection.
- `JWT_SECRET_KEY` - A secret key used for signing JSON Web Tokens.

## Installation

Follow these steps to set up and run the CourseGo API locally:

1. **Clone the repository:**

   git clone https://github.com/ahmd-ramadan/CourseGo.git

# Install dependencies

npm install

# Run the API

npm start
