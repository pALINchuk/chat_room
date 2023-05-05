import {Message} from "../../models";


export const messages = (parent, args) =>{
	return Message.find({})
}