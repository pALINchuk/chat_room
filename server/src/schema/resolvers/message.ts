import {Message} from "../../models";


export const message = (parent, args) =>{
	return Message.findById(args.id)
}