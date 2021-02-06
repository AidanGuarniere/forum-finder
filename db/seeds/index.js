// requirements
const seedUsers = require('./user-seeds');
const seedForums = require('./forum-seeds');
const seedFavorites = require('./favorite-seeds');
const seedPosts = require('./post-seeds');
const seedVotes = require('./vote-seeds');

const sequelize = require('../config/connection');

// seed Model data
const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('--------------');
  
  await seedUsers();
  console.log('--------------');

  await seedForums();
  console.log('--------------');

  await seedFavorites();
  console.log('--------------');

  await seedPosts();
  console.log('--------------');

  await seedVotes();
  console.log('--------------');

  process.exit(0);
};

seedAll();