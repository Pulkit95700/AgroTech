const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // to use the new MongodDB driver URL parser
            useUnifiedTopology: true, // to use the new Server Discover and Monitoring engine
        });
        console.log('MongoDB Connected...'); 
    } catch (err) {
        console.error(err.message); 
        process.exit(1);
    }
}

module.exports = connectDB;