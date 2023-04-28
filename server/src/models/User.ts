import mongoose, {Model, Schema} from "mongoose";



const userSchema = new Schema({
	username: {type: String, required: true, unique: true},
	password: {type: String, required: true, unique: true}
})



export const User: Model<any> = mongoose.model('User', userSchema)