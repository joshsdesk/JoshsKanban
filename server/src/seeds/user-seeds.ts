import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Josh', password: '12345' },
    { username: 'RadiantComet', password: 'password' },
    { username: 'Test', password: 'password' },
  ], { individualHooks: true });
};
