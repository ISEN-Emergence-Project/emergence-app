const Account = require("./Account");
const { sequelize, Model, DataTypes } = require("../utils/database");

class Preselection extends Model {}

Preselection.init({
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
        references: {
            model: Account,
            key: 'accountId',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    }
}, {
    sequelize,
    modelName: 'Preselection'
})

module.exports = Preselection
