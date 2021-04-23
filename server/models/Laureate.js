/**
 * LAUREATE MODEL
 * Create a Laureate model with its attributes
 * Create association with Account model
 */

const Account = require("./Account");
const { sequelize, Model, DataTypes } = require("../utils/database");

class Laureate extends Model {}

Laureate.init({
    fkAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references : {
            model: 'Accounts',
            key: 'accountId'
        }
    },
    studies: {
        type: DataTypes.STRING,
        allowNull: false
    },
    promo: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Laureate'
})

// Create association with Laureate, a Laureate extends an Account
Laureate.Account = Laureate.belongsTo(Account, {
    foreignKey: 'fkAccountId'
})

module.exports = Laureate
