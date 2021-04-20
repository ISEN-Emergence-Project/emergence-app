const { sequelize, Model, DataTypes } = require("../utils/database");

class Account extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

Account.init({
    accountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    resetKey: {
        type: DataTypes.STRING,
        unique: true
    },
    accessToken: {
        type: DataTypes.TEXT,
        unique: true
    },
    refreshToken: {
        type: DataTypes.STRING,
        unique: true
    },
    lastConnectedAt: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'Account'
})

module.exports = Account
