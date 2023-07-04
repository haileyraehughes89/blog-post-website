const sequelize = require("../config/connection");
const User = require("../models/User");
const Post = require("../models/Post");
const seedPosts = require("./post-seeds.json");
const seedUsers = require("./user-seeds.json");

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    // Seed Users
    const users = await User.bulkCreate(seedUsers, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- USERS SEEDED -----\n");
    //seed Goals
    const goals = await Post.bulkCreate(seedPosts, {
      individualHooks: true,
      returning: true,
    });
    console.log("\n----- POSTS SEEDED -----\n");
    //seed Posts
  } catch (err) {
    console.error(err);
  } finally {
    process.exit(0);
  }
};

seedDatabase();
