/**
 * ANSWER MODEL
 * Create an Answer model with its attributes
 * Create association with Question model
 */

const { sequelize, Model, DataTypes } = require("../utils/database");
const Question = require("./Question");

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

// Create an association with Question, an Answer is linked to a Question
Answer.Question = Answer.belongsTo(Question, {
    foreignKey: 'fkQuestionId'
});

module.exports = Answer
