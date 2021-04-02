const { sequelize, Model, DataTypes } = require("../utils/database");

class Account extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

Account.init({
    firstname: {
        type: DataTypes.String,
        allowNull: false
    },
    lastname: {
        type: DataTypes.String,
        allowNull: false
    },
    username: {
        type: DataTypes.String,
        allowNull: false
    },
    email: {
        type: DataTypes.String,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.String,
        allowNull: false
    },
    role: {
        type: DataTypes.String,
        allowNull: false
    },
    isArchived: {
        type: DataTypes.Boolean,
        defaultValue: false,
        allowNull: false
    },
    resetKey: DataTypes.String,
    lastConnectedAt: DataTypes.Date
}, {
    sequelize,
    modelName: 'Account'
})

module.exports = Account
