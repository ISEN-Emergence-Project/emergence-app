const Account = require("./Account");
const { sequelize, Model, DataTypes, Deferrable } = require("../utils/database");

class Match extends Model {}

Match.init({
    fkGodfatherAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Account,
            key: 'accountId',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    },
    fkLaureateAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        unique: true,
        references: {
            model: Account,
            key: 'accountId',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    }
}, {
    sequelize,
    modelName: 'Match'
})

module.exports = Match
