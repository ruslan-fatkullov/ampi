module.exports = (sequelize, Sequelize) => {
    return sequelize.define("file", {
        name: {
            type: Sequelize.STRING
        },
        author: {
            type: Sequelize.STRING
        },
        conuntOfDownload: {
            type: Sequelize.STRING
        },
        linkToFile: {
            type: Sequelize.STRING
        },
    });
};