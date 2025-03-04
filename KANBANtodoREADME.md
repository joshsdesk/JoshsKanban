# Kanban Board Project - ToDo List

## Project Overview
This project enhances an existing Kanban board by integrating authentication using JSON Web Tokens (JWT). Users will securely log in, manage tasks, and maintain session persistence with token-based authentication.

## Task Breakdown

### 1. **Setup & Environment**
- [ ] Install required dependencies (`express`, `jsonwebtoken`, `dotenv`, `cors`, `bcryptjs`, `pg`)
- [ ] Setup `.env` file with:
  ```env
  PORT=5000
  JWT_SECRET=your_super_secret_key
  DATABASE_URL=your_database_connection_string
  ```
- [ ] Ensure TypeScript is set up (`tsconfig.json`)

### 2. **Backend Authentication**
- [ ] Implement JWT authentication middleware (`server/src/middleware/auth.ts`)
- [ ] Create login route to issue JWTs (`server/src/routes/auth-routes.ts`)
- [ ] Secure API routes (`server/src/routes/index.ts`)

### 3. **Frontend Authentication**
- [ ] Implement login API (`client/src/api/authAPI.tsx`)
- [ ] Develop authentication service (`client/src/utils/auth.ts`)
- [ ] Store and manage JWT in localStorage

### 4. **Testing**
- [ ] Use **Insomnia/Postman** to test authentication
- [ ] Ensure session expiration redirects users

### 5. **Deployment**
- [ ] Deploy backend to **Render**
- [ ] Ensure environment variables are properly set in Render
- [ ] Deploy frontend and test the full authentication flow

## References & Documentation
- [JWT Authentication Basics](https://jwt.io/introduction/)
- [Render Deployment Guide](https://coding-boot-camp.github.io/full-stack/render/deploy-with-render-and-postgresql)
- [Express.js Documentation](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [React.js Documentation](https://reactjs.org/)
- [TypeScript Guide](https://www.typescriptlang.org/docs/)

## Bonus Features
- [ ] Implement task sorting & filtering
- [ ] Add user role-based authentication

---
**Status:** Work in Progress 🚀

