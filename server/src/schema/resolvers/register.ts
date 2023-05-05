import {hashPassword, signToken} from "../../utils";
import {HydratedDocument} from "mongoose";
import {IUser, User} from "../../models";


export const register = async (parent, args : {username: string, password: string}) => {
	const {username, password}: {username: string, password: string} = args;
	const hashedPassword: string = await hashPassword(password)

	const result: HydratedDocument<IUser> = await new User({
		username: username,
		password: hashedPassword
	}).save()
	console.log(result)
	return {
		username: result.username,
		password: result.password,
		token: signToken({userId: result._id})
	}
}