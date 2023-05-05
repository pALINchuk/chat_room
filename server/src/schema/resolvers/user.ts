import {User} from "../../models";


export const user = (parent, args, context) =>{
	console.log(context)
	return User.findById(args.id)
}