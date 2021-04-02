const { sequelize, Model, DataTypes } = require("../utils/database");

class Form extends Model {}

Form.init({
    formId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'form_id'
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: DataTypes.TEXT,
    bannerUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'banner_url'
    }
}, {
    sequelize,
    modelName: 'Form',
    tableName: 'forms'
})

module.exports = Form
