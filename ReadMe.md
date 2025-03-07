
# JoshsKanban - Full-Stack Kanban Board with JWT Authentication

## Description
JoshsKanban is a full-stack Kanban board application built with React, Node.js, Express, and PostgreSQL. This project implements secure user authentication using JSON Web Tokens (JWT), ensuring that only authorized users can access and manage work tasks.

## Features
- Secure login page with username and password fields
- JWT authentication with tokens stored in `localStorage`
- Protected Kanban board only accessible to authenticated users
- Automatic session expiration after inactivity
- Full CRUD functionality for managing Kanban tasks
- Deployment on Render (free tier)

## User Story
\`\`\`md
AS A member of an agile team
I WANT a Kanban board with a secure login page
SO THAT I can securely access and manage my work tasks
\`\`\`

## Acceptance Criteria
- Users must log in to access the Kanban board.
- Invalid login credentials show a clear error message.
- Authenticated sessions expire after inactivity.
- Tokens are stored in `localStorage` for authenticated requests.
- Logout clears the token and redirects to login.
- Unauthorized access redirects to the login page.

## Installation
1. Clone the repo:
    \`\`\`bash
    git clone https://github.com/joshsdesk/JoshsKanban.git
    cd JoshsKanban
    \`\`\`

2. Install dependencies for backend and frontend:
    \`\`\`bash
    cd server
    npm install
    cd ../client
    npm install
    \`\`\`

3. Set up environment variables (see `.env.example` below).

4. Start development servers:
    - Backend: \`npm run dev\` in \`server\`
    - Frontend: \`npm run dev\` in \`client\`

## Deployment
This project is deployed on Render:

- **Frontend URL:** [https://your-frontend-url.onrender.com](https://your-frontend-url.onrender.com)
- **Backend URL:** [https://your-backend-url.onrender.com](https://your-backend-url.onrender.com)

> Replace these URLs with your actual deployed links after deployment.

## Screenshots
![Login Page](./Assets/14-01-login-page.png)
![Kanban Board](./Assets/14-02-main-page.png)

## Environment Variables (.env Example)

### Backend `.env`
\`\`\`env
DATABASE_URL=your_render_postgresql_url
JWT_SECRET_KEY=your_random_secret_key
SESSION_EXPIRY_MINUTES=30
\`\`\`

### Frontend `.env` (if using Vite)
\`\`\`env
VITE_API_URL=https://your-backend-url.onrender.com/api
\`\`\`

## License
This project is licensed under the MIT License.
