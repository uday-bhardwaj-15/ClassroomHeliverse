# ERP Project: Student Management System with NextAuth and Prisma

This is a comprehensive ERP project that allows Teachers to manage students, track attendance, and send automated emails with login credentials. The project utilizes NextAuth for authentication and authorization, and Prisma as the ORM (Object-Relational Mapping) tool to interact with a MySQL database.

## Features

- Student Management
- Add, edit, and delete students
- View student profiles with details such as name, email, and
- contact information

## Attendance Tracking

- Add multiple attendance records for each student
- View attendance history for each student
- Automated Email Sending
- Send automated emails to students with their login credentials (username and password)

## Authentication and Authorization

- Utilizes NextAuth for secure authentication and authorization
- Supports login, logout, and password reset functionality
- Protected routes: users cannot access certain pages without logging in
- Role-based access control: teachers and students have different levels of access and cannot access each other's pages by URL

## Role-Based Access Control

- Teachers can view and manage attendance records for students
- Students can view their own attendance records and profile information

## Technologies Used

- Next.js (React framework)
- NextAuth (Authentication and Authorization library)
- Prisma (ORM tool)
- MySQL (Relational database management system)
- Node.js (Server-side runtime environment)

## Getting Started

- Node.js installed on your machine
- MySQL installed and running on your machine
- Prisma CLI installed globally: npm install -g @prisma/cli

## Installation

Clone the repository

```bash
git clone https://github.com/uday-bhardwaj-15/erp
```

Install dependencies:

```bash
npm install or yarn install
```

Create a MySQL database and update the `prisma/schema`.prisma file with your database credentials

```bash
Run npx prisma migrate dev to create the database schema
```

Start the development server

```bash
npm run dev or yarn dev
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL: your MySQL connection string`

`NEXTAUTH_URL: your NextAuth URL`

`EMAIL_USERNAME: your email username`

`EMAIL_PASSWORD: your email password`

`Running the Application`

`Start the development server: npm run dev or yarn dev`

`Open your web browser and navigate to http://localhost:3000`

## Prisma Schema

The Prisma schema is defined in `prisma/schema.prisma`. This file defines the database schema, including the Student, Teacher, and Attendance models.

## NextAuth Configuration

The NextAuth configuration is defined in `nextauth.config.js`. This file defines the authentication and authorization settings, including the login, logout.

## Protected Routes

The following routes are protected and require authentication:

- /teacher: accessible only to teachers
- /student: accessible only to students

## Role-Based Access Control

- Teachers can view and manage attendance records for students
- Students can view their own attendance records and profile information

## Role-Based Access Control

- Teachers can view and manage attendance records for students
- Students can view their own attendance records and profile information

## Contributing

Contributions are welcome!

If you'd like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- Next.js and NextAuth teams for creating amazing libraries
- Prisma team for creating a powerful ORM tool
- MySQL team for creating a powerful relational database management system
