export const seedUsers = async () => {
  await User.bulkCreate([
    { username: 'Josh', password: '12345' },
    { username: 'Tester', password: '12345' },
  ], { individualHooks: true });
};
