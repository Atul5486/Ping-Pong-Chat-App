import mongoose from 'mongoose'

export const connectDb=()=>{
        mongoose.connect(process.env.MONGO_URI,{
  family: 4,
  serverSelectionTimeoutMS: 5000
}).then(()=>{
            console.log("MongoDb Connected successfully");
        }).catch((err)=>{
        console.log(err) 
    })
}