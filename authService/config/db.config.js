module.exports = {
    HOST: "127.0.0.1",
    PORT: "3003",
    USER: "root",
    PASSWORD: "",
    DB: "fileStorage",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
  };