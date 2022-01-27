/**
 * DATABASE CONFIGURATION AND CONNECTION
 * Connects to database
 * Synchronize models with database
 */

const { Sequelize, Model, DataTypes, Deferrable, ConnectionError} = require('sequelize');

if (!process.env.DATABASE_URL) {
    throw new ConnectionError("Error: DATABASE_URL is undefined. Check that you have 'DATABASE_URL' env variable exists.")
}

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
        console.log('Sequelize: Connection has been established successfully.\n');
    })
    .catch(err => {
        console.error('Sequelize: Unable to connect to the database:', err);
    });

sequelize
    .sync()
    .then(() => {
        console.log('Sequelize: All models were synchronized successfully.\n')
    })
    .catch(err => {
        console.log('Sequelize: The was an error while synchronizing with database:', err);
    })

// Export modules
module.exports = {
    sequelize,
    Model,
    DataTypes,
    Deferrable
}
