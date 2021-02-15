const dotenv = require('dotenv').config({path:'C:/nodeProgramLaptop/enterprise-application/.env'});
module.exports = {
    development: {
      username: process.env.user,
      password:process.env.password,
      database:process.env.database,
      host: process.env.host,
      dialect: "mysql",
      timezone: "+05:30",
    },
    test: {
      username: process.env.user,
      password:process.env.password,
      database:process.env.testdatabase,
      host: process.env.host,
      dialect: "mysql",
  },
  production: {
    username: process.env.user,
    password:process.env.password,
    database:process.env.database,
    host: process.env.host,
    dialect: "mysql",
  },

  }
 