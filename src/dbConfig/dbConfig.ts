import mongoose from "mongoose";
import fs from "fs"
const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("Mongo db Connected Successfully!");
        })
        connection.on('error', (err) => {
            console.log("Mongo db error--", err)
            process.exit()
        })

    } catch (error) {
        console.log('catch Error---', error);
    }
}

export default connect