const { Model, DataTypes } = require('sequelize');

class Account extends Model {
    getFullName() {
        return [this.firstname, this.lastname].join(' ')
    }
}

module.exports = (sequelize, type) => {
    return Account.init({
        accountId: {
            type: DataTypes.INT,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
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
}
