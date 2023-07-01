const sequelize = require("../config/connection");
const Dashboard = require("../models/Dashboard");
const dashData = require("./dash-seeds.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Dashboard.bulkCreate(dashData, {
    individualHooks: true,
    returning: true,
  });
  console.log(dashData);
  process.exit(0);
};

seedDatabase();
