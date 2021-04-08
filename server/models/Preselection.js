const { sequelize, Model, DataTypes } = require("../db/database");

class Preselection extends Model {}

Preselection.init({
    fkGodfatherAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'accountId'
        }
    },
    fkLaureateAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'accountId'
        }
    }
}, {
    sequelize,
    modelName: 'Preselection'
})

module.exports = Preselection
