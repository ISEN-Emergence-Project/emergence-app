const { sequelize, Model, DataTypes } = require("../database");

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
    isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    resetKey: {
        type: DataTypes.STRING
    },
    lastConnectedAt: {
        type: DataTypes.DATE
    },
    laureatePromo: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Account'
})

module.exports = Account
