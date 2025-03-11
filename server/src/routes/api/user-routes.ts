import express from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../../controllers/user-controller.js';
import { seedUsers } from '../../seeds/user-seeds.js';

const router = express.Router();

// GET /users - Get all users
router.get('/', getAllUsers);

// GET /users/:id - Get a user by id
router.get('/:id', getUserById);

// POST /users - Create a new user
router.post('/', createUser);

// PUT /users/:id - Update a user by id
router.put('/:id', updateUser);

// DELETE /users/:id - Delete a user by id
router.delete('/:id', deleteUser);

// ✅ TEMP route to seed users (remove or protect later)
router.post('/seed', async (req, res) => {
  try {
    await seedUsers();
    res.status(200).json({ message: 'Users seeded successfully!' });
  } catch (error: any) {
    console.error('Seeding error:', error);
    res.status(500).json({ message: 'Failed to seed users.' });
  }
});

export { router as userRouter };
