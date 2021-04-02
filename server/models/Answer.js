const Account = require("./Account");
const Question = require("./Question");
const { sequelize, Model, DataTypes } = require("../utils/database");

class Answer extends Model {}

Answer.init({
    fkAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Account,
            key: 'accountId'
        }
    },
    fkQuestionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Question,
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
