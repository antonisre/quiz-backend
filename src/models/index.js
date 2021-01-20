const db = require('../config/database');

async function databaseInit() {
    try {
        await db.authenticate();
        console.log('DB connection has been established successfully.');

        //sync db
        await db.sync();
        console.log("All models were synchronized successfully.");
    } catch (err) {
        console.log('Failed to init db', err);
        process.exit();
    }
}

module.exports = databaseInit;