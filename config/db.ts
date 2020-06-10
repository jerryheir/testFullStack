import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const URI = process.env.MONGO_URI || '';
        await mongoose.connect(URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
    } catch (err){
        console.log(`ERROR ${err.message}`);
        process.exit(1);
    }
}

export default connectDB;