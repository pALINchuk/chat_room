import mongoose, {model, Model, Schema} from "mongoose";


const messageSchema : Schema = new Schema({
	text: {type: String, required: true},
	post_date: {type: String, required: true},
	userId: {type: String, required: true}
})


export const Message: Model<any> = mongoose.model('Message', messageSchema)