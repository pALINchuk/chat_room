import {User} from "../models";

export const isValidUser = async (userId: string) =>{
	const user = User.findById(userId)
	return !!user;
}