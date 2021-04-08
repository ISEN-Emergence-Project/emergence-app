const { sequelize, Model, DataTypes } = require("../database");

class Question extends Model {}

Question.init({
    questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    question: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    fkFormId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Forms',
            key: 'formId'
        }
    }
}, {
    sequelize,
    modelName: 'Question'
})

module.exports = Question
