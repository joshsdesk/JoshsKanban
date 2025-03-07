import { User } from '../models/user.js';

export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'JollyGuru', password: 'password' },
    { username: 'SunnyScribe', password: 'password' },
    { username: 'Josh', password: 'password' },
    { username: 'RadiantComet', password: 'password' },
    { username: 'Test', password: 'password' },
  ], { individualHooks: true });
};
