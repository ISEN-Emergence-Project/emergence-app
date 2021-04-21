const { sequelize, Model, DataTypes } = require("../utils/database");

const Godfather = require("./Godfather");
const Laureate = require("./Laureate");

class Preselection extends Model {}

Preselection.init({
    fkGodfatherAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Godfathers',
            key: 'fkAccountId'
        }
    },
    fkLaureateAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Laureates',
            key: 'fkAccountId'
        }
    }
}, {
    sequelize,
    modelName: 'Preselection'
})

Preselection.GodfatherAccount = Preselection.hasOne(Godfather, {
    foreignKey: 'fkAccountId',
    sourceKey: 'fkGodfatherAccountId',
    as: 'Godfather'
})

Preselection.LaureateAccount = Preselection.hasOne(Laureate, {
    foreignKey: 'fkAccountId',
    sourceKey: 'fkLaureateAccountId',
    as: 'Laureate'
})

module.exports = Preselection
