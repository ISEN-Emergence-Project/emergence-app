const Form = require("./Form");
const Account = require("./Account");
const Question = require("./Question");
const { sequelize, Model, DataTypes, Deferrable } = require("../utils/database");

class Answer extends Model {}

Answer.init({
    fkAccountId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Account,
            key: 'accountId',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    },
    fkQuestionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
            model: Question,
            key: 'questionId',
            deferrable: Deferrable.INITIALLY_DEFERRED
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
