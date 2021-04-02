const { sequelize, Model, DataTypes } = require("../utils/database");

class Account extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

Account.init({
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
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    resetKey: DataTypes.STRING,
    lastConnectedAt: DataTypes.DATE
}, {
    sequelize,
    modelName: 'Account'
})

module.exports = Account
