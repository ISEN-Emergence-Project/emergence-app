const { Sequelize, Model, DataTypes, Deferrable } = require('sequelize');

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
