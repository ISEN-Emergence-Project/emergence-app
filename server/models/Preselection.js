/**
 * PRESELECTION MODEL
 * Create a Preselection model with its attributes
 * Create association with Godfather and Laureate models
 */

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

// Create association with Godfather, a Preselection is linked to a Godfather
Preselection.GodfatherAccount = Preselection.hasOne(Godfather, {
    foreignKey: 'fkAccountId',
    sourceKey: 'fkGodfatherAccountId',
    as: 'Godfather'
})

// Create association with Laureate, a Preselection is linked to a Laureate
Preselection.LaureateAccount = Preselection.hasOne(Laureate, {
    foreignKey: 'fkAccountId',
    sourceKey: 'fkLaureateAccountId',
    as: 'Laureate'
})

module.exports = Preselection
