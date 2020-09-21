const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("thinlinkDb", "tolga", "root", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;
