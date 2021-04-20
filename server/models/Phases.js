const { sequelize, Model, DataTypes } = require("../utils/database");

class Phase extends Model {}

Phase.init({
    phaseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    lead: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buttonText: {
        type: DataTypes.STRING,
        allowNull: false
    },
    buttonLink: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Phase'
})

module.exports = Phase
