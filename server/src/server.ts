const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import path from 'path';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.static('../client/dist'));

// API Routes
app.use('/api', routes);

// Serve React frontend (fallback to index.html for React Router)
app.get('*', (_req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, '../client/dist') });
});

// Sync Database and Start Server
sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
