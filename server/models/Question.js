const Form = require("./Form");
const { sequelize, Model, DataTypes } = require("../utils/database");

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
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Form,
            key: 'formId',
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    }
}, {
    sequelize,
    modelName: 'Question'
})

module.exports = Question
