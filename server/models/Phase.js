/**
 * PHASE MODEL
 * Create a Phase model with its attributes
 */

const { sequelize, Model, DataTypes } = require("../utils/database");

class Phase extends Model {}

Phase.init({
    phaseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    lead: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buttonText: {
        type: DataTypes.STRING
    },
    buttonLink: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Phase'
})

module.exports = Phase
