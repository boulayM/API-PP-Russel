const mongoose = require ("mongoose");

const clientOptions = {
    dbName: 'apinode'
};

exports.initClientDbConnection = async () => {
    try {
        await mongoose.connect("mongodb+srv://macboulay2:UTy5ZRBK8P8UE0rY@cluster0.zqhyfax.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", clientOptions)
        console.log("connected");
    
    }catch (error) {
        console.log (error);
        throw (error);
    }
}
