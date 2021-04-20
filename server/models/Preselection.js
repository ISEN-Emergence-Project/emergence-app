const { sequelize, Model, DataTypes } = require("../utils/database");

class Preselection extends Model {}

Preselection.init({
    fkGodfatherAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Godfather',
            key: 'fkAccountId'
        }
    },
    fkLaureateAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Laureate',
            key: 'fkAccountId'
        }
    }
}, {
    sequelize,
    modelName: 'Preselection'
})

module.exports = Preselection
