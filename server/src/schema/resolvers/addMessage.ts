import {Message} from "../../models";


export const addMessage = (parent, args:{text: string, post_date: string, userId: string}) =>{
	const {text, post_date, userId} = args;
	const message = new Message({
		text: text,
		post_date: post_date,
		userId: userId
	})
	return message.save()
}