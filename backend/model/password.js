import mongoose from "mongoose"

const passwordSchema = new mongoose.Schema({
    id: String,
    url: String,
    username: String,
    password: String

})

export const Pwd = mongoose.model("Password", passwordSchema) 
//       backend             //passwords: collection name       //schema