import {hashPassword, signToken} from "../../utils";
import {HydratedDocument} from "mongoose";
import {IUser, User} from "../../models";


export const register = async (parent, args : {username: string, password: string}) => {
	const {username, password}: {username: string, password: string} = args;
	const hashedPassword: string = await hashPassword(password)
	let result: HydratedDocument<IUser> = null;
	try{
		result = await new User({
			username: username,
			password: hashedPassword
		}).save()
	}catch{
		throw new Error("Error while creating new user")
	}


	return result
}