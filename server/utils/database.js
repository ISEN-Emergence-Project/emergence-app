const { Sequelize, Model, DataTypes } = require('sequelize');
const Deferrable = require("sequelize/types/lib/deferrable");

// Connexion to database
const sequelize = new Sequelize(
    process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

// Test connexion
sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize
    .sync()
    .then(() => {
    console.log('All models were synchronized successfully');
})

// Export modules
module.exports = {
    sequelize,
    Model,
    DataTypes,
    Deferrable
}
