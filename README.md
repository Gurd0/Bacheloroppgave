# Modular E-learning Platform

## Description

The Modular E-learning Platform is a TypeScript-based project that provides a flexible and scalable course platform. It leverages Firebase Firestore as the database and NPM as the package manager. This platform allows admin users to create and manage courses, while non-admin users can participate in those courses.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
```
2. Navigate to the project directory:
```bash
cd modular-elearning-platform
```
3. Install the dependencies using NPM:
```bash
npm install
```
4. Set up Firebase Firestore:

Create a Firebase project at https://firebase.google.com
Enable Firestore as the database for your project
Generate the Firebase configuration object
Add the configuration object to the project .env file

## Usage
1. Run the development server:
```bash
npm run start
```
2. Open your web browser and visit http://localhost:3000 to access the Modular E-learning Platform.

## Features
* Admin Dashboard: Admin users can create, edit, and manage courses. They have full control over the course content, including courses, chapters and pages.
* Course Enrollment: Non-admin users can browse and enroll in available courses. Once enrolled, they can access the course materials and track their progress.
* Interactive Lessons: Courses include interactive lessons, allowing users to learn through multimedia content such as videos, text, images  and quizzes.
* Progress Tracking: Users can track their progress within each course, enabling them to easily pick up where they left off.
* User Authentication: User authentication is implemented using Firebase Authentication, ensuring secure access to the platform.


