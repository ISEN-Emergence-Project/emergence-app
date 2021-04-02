const { sequelize, Model, DataTypes } = require("../utils/database");

class Form extends Model {}

Form.init({
    title: {
        type: DataTypes.String,
        allowNull: false
    },
    description: DataTypes.TEXT,
    bannerUrl: {
        type: DataTypes.String,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Form'
})

module.exports = Form
