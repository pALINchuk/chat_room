import mongoose, {model, Model, Schema} from "mongoose";

export interface IMessage extends Document{
	text: string;
	post_date: string;
	userId: string;
}


const messageSchema : Schema<IMessage> = new Schema<IMessage>({
	text: {type: String, required: true},
	post_date: {type: String, required: true},
	userId: {type: String, required: true}
})


export const Message: Model<IMessage> = mongoose.model<IMessage>('Message', messageSchema)