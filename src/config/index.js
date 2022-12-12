const dotenv = require('dotenv').config();

module.exports = {
    MONGO_CONNECTION_STRING: process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/ecommerce',
    PUERTO: process.env.PORT || 8080
}