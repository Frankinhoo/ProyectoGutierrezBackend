const mongoose = require('mongoose');


const connectionString = process.env.MONGO_ATLAS_SRV || 'mongodb://localhost:27017/ecommerce'

const initMongoDB = async () => {
    try {
        await mongoose.connect(connectionString)
        console.log('CONECTADO A LA BASE DE DATOS');
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
}

const disconnectMongoDB = async () => {
    try {
        await mongoose.disconnect();
        console.log('DESCONECTADO DE LA BASE DE DATOS');
    } catch (error) {
        console.log(`ERROR => ${error}`);
        return error;
    }
}

module.exports = {
    initMongoDB,
    disconnectMongoDB
}