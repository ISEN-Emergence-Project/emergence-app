const { sequelize, Model, DataTypes } = require("../db/database");

class Answer extends Model {}

Answer.init({
    fkAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Accounts',
            key: 'accountId'
        }
    },
    fkQuestionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: 'Questions',
            key: 'questionId'
        }
    },
    answer: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Answer'
})

module.exports = Answer
