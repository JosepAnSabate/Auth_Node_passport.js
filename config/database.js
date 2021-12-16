const mongoose = require('mongoose');

require('dotenv').config();

/**
 * -------------- DATABASE ----------------
 */

/**
 * Connect to MongoDB Server using the connection string in the `.env` file.  To implement this, place the following
 * string into the `.env` file
 * 
 * DB_STRING=mongodb://<user>:<password>@localhost:27017/database_name
 * DB_STRING_PROD=<your production database string>
 */ 

const devConnection = process.env.DB_STRING;
const prodConnection = process.env.DB_STRING_PROD;

const conn = process.env.DB_STRING;

const connection = mongoose.createConnection(conn, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Create a simple esquema for user
const UserSchema = new mongoose.Schema({
    username: String,
    hash: String,
    salt: String,
    admin: Boolean
});


const User = connection.model('User', UserSchema);

//Expose connection
module.exports = connection;



// // Connect to the correct environment database
// if (process.env.NODE_ENV === 'production') {
//     mongoose.connect(prodConnection, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//     });
// } else {
//     mongoose.connect(devConnection, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     });

//     mongoose.connection.on('connected', () => {
//         console.log('Database connected');
//     });
// }