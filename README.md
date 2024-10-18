
# Pregnancy Tracker Backend

## Overview
This is the backend of the **Pregnancy Tracker** application, designed to help pregnant women track their pregnancy journey, milestones, and health updates. The backend provides user authentication, pregnancy tracking, and notifications for trimester updates and milestones.

## Table of Contents
1. [Features](#features)
2. [Technologies](#technologies)
3. [Getting Started](#getting-started)
. [Running Tests](#running-tests)

## Features
- User registration and login (with JWT authentication).
- Pregnancy tracking: add, update, and view pregnancy details.
- Notifications for trimester milestones.
- Secure API routes for managing user and pregnancy data.
- Detailed API documentation (via Swagger).

## Technologies
- **Node.js** with **Express.js** for the backend server.


- **MongoDB** with **Mongoose** for the database.
- **JWT** for authentication.
- **bcrypt** for password hashing.
- **node-cron** for scheduling notifications.
- **Jest** for testing.

## Getting Started

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v12+)
- MongoDB (local or MongoDB Atlas)
- npm or yarn (package manager)

### Installation

1. Clone the repository:

    \`\`\`bash
    git clone https://github.com/yourusername/pregnancy-tracker-backend.git
    \`\`\`

2. Navigate into the project directory:

    \`\`\`bash
    cd pregnancy-tracker-backend
    \`\`\`

3. Install dependencies:

    \`\`\`bash
    npm install
    \`\`\`

4. Set up environment variables:
   
   Create a `.env` file at the root of your project and add the following environment variables:
   
   \`\`\`bash
   NODE_ENV=development
   PORT=5000
   MONGO_URI=<your_mongodb_connection_string>
   JWT_SECRET=<your_jwt_secret>
   \`\`\`

5. Run the development server:

    \`\`\`bash
    npm start
    \`\`\`

6. Your server should now be running at `http://localhost:5000`.

## Running Tests

We use **Jest** as our testing framework to ensure the quality and reliability of the API. Tests are located in the `test/` directory and cover routes, authentication, and pregnancy tracking functionalities.

To run tests:

\`\`\`bash
npm test
\`\`\`

If you encounter issues related to unhandled handles, you can run tests with the `--detectOpenHandles` flag:

\`\`\`bash
npm test -- --detectOpenHandles
\`\`\`


## Authors
- **Your Name** 

## Future Plans
- Extend the notification system to support more milestone types.
- Integrate with external health APIs to provide additional pregnancy advice and information.