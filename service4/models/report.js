module.exports = (sequelize, Sequelize) => {
    return sequelize.define("report", {
        file: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        userDownload: {
            type: Sequelize.STRING
        },
        date: {
            type: Sequelize.DATE
        },
    });
};