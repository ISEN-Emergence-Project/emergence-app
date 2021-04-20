const { sequelize, Model, DataTypes } = require("../utils/database");

class Meeting extends Model {}

Meeting.init({
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
    },
    beginning: {
        type: DataTypes.DATE,
        allowNull: false
    },
    ending: {
        type: DataTypes.DATE,
        allowNull: false
    },
    godfatherRating: {
        type: DataTypes.SMALLINT
    },
    laureateRating: {
        type: DataTypes.SMALLINT
    }
}, {
    sequelize,
    modelName: 'Meeting'
})

module.exports = Meeting
