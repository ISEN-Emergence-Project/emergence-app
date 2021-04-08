const { sequelize, Model, DataTypes } = require("../db/database");

class Match extends Model {}

Match.init({
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
        unique: true,
        references: {
            model: 'Accounts',
            key: 'accountId'
        }
    }
}, {
    sequelize,
    modelName: 'Match'
})

module.exports = Match
