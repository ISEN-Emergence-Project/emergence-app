const { sequelize, Model, DataTypes } = require("../utils/database");

class Form extends Model {}

Form.init({
    formId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
        defaultValue: ''
    },
    bannerUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phase: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'preparation'
    }
}, {
    sequelize,
    modelName: 'Form'
})

module.exports = Form
