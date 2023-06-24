import mongoose from "mongoose";

let isConnected = false;

export const connectToDatabase = async () => {
    mongoose.set( 'strictQuery', true );
    if ( isConnected ) {
        console.log( '=> Mongo Database Connected' );
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "ecommerce",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true;
        console.log( '=> Mongo Database Connected' );

    }
    catch ( error ) {
        console.log( '=> Mongo Database Connection Failed' );
        console.log( error );
    }

}