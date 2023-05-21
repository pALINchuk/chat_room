import {Message, User} from "../../models";
import {NEW_MESSAGE_EVENT, pubSub} from "../../helpers";
import {newMessage} from "./newMessage";


export const addMessage = async (parent, args:{text: string, post_date: string, userId: string}, context) =>{
	const {text, post_date, userId} = args;
	const message = new Message({
		text: text,
		post_date: post_date,
		userId: userId
	})

	const newMessage = message.save()

	const user = await User.findById(userId)

	console.log(newMessage)
	pubSub.publish(NEW_MESSAGE_EVENT, {newMessage: newMessage})

	return newMessage
}