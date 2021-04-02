const { sequelize, Model, DataTypes } = require("../utils/database");

class Answer extends Model {}

Answer.init({
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
        references: {
            model: 'Accounts',
            key: 'accountId'
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
    modelName: 'Answer'
})

module.exports = Answer
