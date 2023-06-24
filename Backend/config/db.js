import mongoose from "mongoose";

 
const connectDB = async ()=> {
try {
    mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "ecommerce",
            useNewUrlParser: true,
            useUnifiedTopology: true,
    })
    console.log(`mongoDB connected ${conn.connection.host}`)
} catch (error) {
    console.log(`Error : ${error.message}`)
    process.exit(1);
}
}

export default connectDB
