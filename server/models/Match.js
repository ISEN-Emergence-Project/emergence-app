const { sequelize, Model, DataTypes } = require("../utils/database");

class Match extends Model {}

Match.init({
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
        unique: true,
        references: {
            model: 'Laureate',
            key: 'fkAccountId'
        }
    }
}, {
    sequelize,
    modelName: 'Match'
})

module.exports = Match
