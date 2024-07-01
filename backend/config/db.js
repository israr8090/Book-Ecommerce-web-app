import mongoose from "mongoose";
import 'dotenv/config';  //--dotenv
const atlas = process.env.DB_URL;

const connectDB = async () => {
   try {
   //  await mongoose.connect ('mongodb://localhost:27017/bookEcommerce');
    await mongoose.connect(atlas);
    console.log('server is connected with Database Successfully')  
   } catch (error) {
        console.log(error)
   }
};

export default connectDB;