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
        allowNull: false,
        field: 'account_id'
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
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'password_hash'
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
        field: 'is_archived'
    },
    resetKey: {
        type: DataTypes.STRING,
        field: 'reset_key'
    },
    lastConnectedAt: {
        type: DataTypes.DATE,
        field: 'last_connected_at'
    }
}, {
    sequelize,
    modelName: 'Account',
    tableName: 'accounts'
})

module.exports = Account
