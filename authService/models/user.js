module.exports = (sequelize, Sequelize) => {
    return sequelize.define("user", {
        login: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        token: {
            type: Sequelize.STRING
        },
    });
};