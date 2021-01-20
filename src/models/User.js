const db = require('../config/database');
const Sequelize = require('sequelize');
const responseCodes = require('../util/responseCodes.json');
const statusCodes = require('../util/statusCodes.json');
const responseMessages = require('../util/responseMessages.json');
const { hashPassword } = require('../util/bycript');

const User = db.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING,
    }
}, 
{
    indexes:[{
        unique: true,
        fields: ['username']
    }]
});

const createUser = async userData => {
    if (userData.password) userData.password = await hashPassword(userData.password);

    const newUser = await User.create(userData);
    return newUser.dataValues;
}

const findUserBySigninCredentials = async userData => {
    const user = await User.findOne({ where: { username: userData.username }});
    if (!user) {
        throw { message: responseMessages.userNotFound, code: responseCodes.userNotFound, statusCode: statusCodes.NOT_FOUND };
    }
    return user.dataValues;
}

module.exports = { 
    User,
    createUser,
    findUserBySigninCredentials,
}