const { sequelize, Model, DataTypes } = require("../utils/database");

class Form extends Model {}

Form.init({
    formId: {
        type: DataTypes.INT,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: {
        type: DataTypes.String,
        allowNull: false
    },
    description: DataTypes.Text,
    bannerUrl: {
        type: DataTypes.String,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Form'
})

module.exports = Form
