import {Message, User} from "../../models";
import {NEW_MESSAGE_EVENT, pubSub} from "../../helpers";
import {GraphQLError} from "graphql/error";


export const addMessage = async (parent, args:{text: string, post_date: string, userId: string}, context) =>{



	if(!context.isAuth){
		return new GraphQLError("UNAUTHORIZED", null, null, null, null,null, {
			errorCode: "UNAUTHORIZED"
		})
	}

	const {text, post_date, userId} = args;


	if(!text || !post_date || !userId){
		const emptyField: string = [["text", text], ["post_date", post_date], ["userId", userId]].find(field=>!field[1])[0]
		return new GraphQLError(`MESSAGE NOT COMPLETE "${emptyField}" IS MISSING.`)
	}

	const message = new Message({
		text: text,
		post_date: post_date,
		userId: userId
	})

	const newMessage = message.save()

	const user = await User.findById(userId)


	pubSub.publish(NEW_MESSAGE_EVENT, {newMessage: newMessage})

	return newMessage

}