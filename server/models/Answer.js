const { sequelize, Model, DataTypes } = require("../utils/database");

class Answer extends Model {}

Answer.init({
    answerId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    answer: {
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
            key: formId,
            deferrable: Deferrable.INITIALLY_DEFERRED
        }
    }
}, {
    sequelize,
    modelName: 'Answer'
})

module.exports = Answer
